import RepositoryBase from '../../RepositoryBase';
import typeORM from 'typeorm';

export class PersonSearchRepository extends RepositoryBase {
  private static instance: PersonSearchRepository = null;

  static repositoryName = 'PersonSearch';

  private constructor() {
    super();
  }

  public static getInstance(typeOrm: typeORM.Repository<unknown>): PersonSearchRepository {
    if (!PersonSearchRepository.instance) {
      PersonSearchRepository.instance = new PersonSearchRepository();
    }

    PersonSearchRepository.instance.repository = typeOrm;

    return PersonSearchRepository.instance;
  }

  public async execute(content: string): Promise<unknown> {
    try {
      const filter = {
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
          'borrows.titlePublisher.publisher',
        ],
        where: (qb: any) => {
          qb.where(`User.name like '%${content}%'`);
        },
        limit: 15,
      };
      const data = await this.repository.find(filter);
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
