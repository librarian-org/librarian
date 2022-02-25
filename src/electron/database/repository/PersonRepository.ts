import RepositoryBase from './RepositoryBase';

interface Where {
  where: unknown;
}
interface List extends Where {
  pageStart: number;
  pageSize: number;
}

export default class PersonRepository extends RepositoryBase {
  public async listPerson(content: List): Promise<unknown | unknown[]> {
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
          'borrows.titlePublisher.publisher',
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

  public async read(content: Where): Promise<unknown | unknown[]> {
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
          'borrows.titlePublisher.publisher',
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

  public async globalSearch(content: string): Promise<unknown | unknown[]> {
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
