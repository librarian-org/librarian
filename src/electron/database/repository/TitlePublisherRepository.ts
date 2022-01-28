import RepositoryBase from './RepositoryBase';

interface ListTitlePublisher {
  where: unknown;
}

export default class TitlePublisherRepository extends RepositoryBase {
  public async listTitle(content: ListTitlePublisher): Promise<unknown | unknown[]> {
    try {
      const filter = {
        relations: [
          'title',
        ],
      };

      // if (content.where) {
      //   filter = { ...filter, ...{ where: content } };
      // }

      return await this.repository.find(filter);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
