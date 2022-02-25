import RepositoryBase from './RepositoryBase';

interface Where {
  where: unknown;
}
interface ListTitle extends Where {
  pageStart: number;
  pageSize: number;
}

export default class TitleRepository extends RepositoryBase {
  public async listTitle(content: ListTitle): Promise<unknown | unknown[]> {
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

  public async read(content: Where): Promise<unknown | unknown[]> {
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
          'titleAuthors',
          'titleAuthors.author',
          'titleCategories',
          'titleCategories.category',
          'titlePublishers',
          'titlePublishers.publisher',
        ],
        where: (qb: any) => {
          qb.where(`Title.name like '%${content}%'`)
            .orWhere(
              `Title__titleCategories__category.name like '%${content}%'`
            )
            .orWhere(`Title__titleAuthors__author.name like '%${content}%'`);
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
