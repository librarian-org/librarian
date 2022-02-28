import RepositoryBase from '../../RepositoryBase';
import typeORM from 'typeorm';

interface Where {
  where: unknown;
}

interface List extends Where {
  pageStart: number;
  pageSize: number;
}

export class ListPersonRepository extends RepositoryBase {
  private static instance: ListPersonRepository = null;

  static repositoryName = 'ListPerson';

  private constructor() {
    super();
  }

  public static getInstance(typeOrm: typeORM.Repository<unknown>): ListPersonRepository {
    if (!ListPersonRepository.instance) {
      ListPersonRepository.instance = new ListPersonRepository();
    }

    ListPersonRepository.instance.repository = typeOrm;

    return ListPersonRepository.instance;
  }

  public async execute(content: List): Promise<unknown> {
    try {
      let filter = {
        relations: [
          'userType',
          'contacts',
          'contacts.contactType',
          'addresses',
          'addresses.city',
          'addresses.city.region',
          'addresses.city.region.country',
          'borrows',
          'borrows.titlePublisher',
          'borrows.titlePublisher.title',
          'borrows.titlePublisher.publisher'
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
