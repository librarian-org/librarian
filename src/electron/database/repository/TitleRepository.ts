import RepositoryBase from './RepositoryBase';

interface ListTitle {
  where: unknown;
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
        filter = { ...filter, ...{ where: content } };
      }

      const [data, count] = await this.repository.findAndCount(filter);

      return { data, count };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
