import RepositoryBase from '../../RepositoryBase';
import typeORM from 'typeorm';

interface Where {
  where: unknown;
}
interface List extends Where {
  pageStart: number;
  pageSize: number;
}

export class ListTitleRepository extends RepositoryBase {
  private static instance: ListTitleRepository = null;

  static repositoryName = 'ListTitle';

  private constructor() {
    super();
  }

  public static getInstance(typeOrm: typeORM.Repository<unknown>): ListTitleRepository {
    if (!ListTitleRepository.instance) {
      ListTitleRepository.instance = new ListTitleRepository();
    }

    ListTitleRepository.instance.repository = typeOrm;

    return ListTitleRepository.instance;
  }

  public async execute(content: List): Promise<unknown> {
    try {
      let filter = {
        relations: [
          'titleAuthors',
          'titleAuthors.author',
          'titleCategories',
          'titleCategories.category',
          'titlePublishers',
          'titlePublishers.publisher',
        ],
        skip: content.pageStart || 0,
        take: content.pageSize || 10,
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
