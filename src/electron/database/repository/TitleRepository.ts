import RepositoryBase from './RepositoryBase';

export default class TitleRepository extends RepositoryBase {
  public async listTitle(content: unknown): Promise<unknown | unknown[]> {
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

      if (content) {
        filter = { ...filter, ...{ where: content } };
      }

      return await this.repository.find(filter);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
