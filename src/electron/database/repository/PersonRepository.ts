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
          'contacts',
          'contacts.contactType',
          'addresses',
          'addresses.city',
          'addresses.city.region',
          'addresses.city.region.country',
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
