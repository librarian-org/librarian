import RepositoryBase from '../../RepositoryBase';
import typeORM from 'typeorm';

interface Where {
  where: unknown;
}

interface List extends Where {
  pageStart: number;
  pageSize: number;
}

export class ListBorrowRepository extends RepositoryBase {
  private static instance: ListBorrowRepository = null;

  static repositoryName = 'ListBorrow';

  private constructor() {
    super();
  }

  public static getInstance(typeOrm: typeORM.Repository<unknown>): ListBorrowRepository {
    if (!ListBorrowRepository.instance) {
      ListBorrowRepository.instance = new ListBorrowRepository();
    }

    ListBorrowRepository.instance.repository = typeOrm;

    return ListBorrowRepository.instance;
  }

  public async execute(content: List): Promise<unknown> {
    try {
      let filter = {
        relations: ['titlePublisher', 'titlePublisher.title', 'renovations'],
        skip: content.pageStart || 0,
        take: content.pageSize || 10,
        order: {
          estimatedReturn: 'ASC',
        },
      };

      if (content.where) {
        filter = { ...filter, ...{ where: content.where } };
      }

      const [data, count] = await this.repository.findAndCount(filter);

      return { data, count };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
