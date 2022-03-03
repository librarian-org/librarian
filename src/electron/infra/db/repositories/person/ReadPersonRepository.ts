import RepositoryBase from '../../RepositoryBase';
import typeORM from 'typeorm';

interface Where {
  where: unknown;
}

interface List extends Where {
  pageStart: number;
  pageSize: number;
}

export class ReadPersonRepository extends RepositoryBase {
  private static instance: ReadPersonRepository = null;

  static repositoryName = 'ReadPerson';

  private constructor() {
    super();
  }

  public static getInstance(typeOrm: typeORM.Repository<unknown>): ReadPersonRepository {
    if (!ReadPersonRepository.instance) {
      ReadPersonRepository.instance = new ReadPersonRepository();
    }

    ReadPersonRepository.instance.repository = typeOrm;

    return ReadPersonRepository.instance;
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
      };

      if (content.where) {
        filter = { ...filter, ...{ where: content.where } };
      }

      return await this.repository.findOne(filter);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
