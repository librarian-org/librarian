import RepositoryBase from './RepositoryBase';

interface ListBorrow {
  where: unknown;
  pageStart: number;
  pageSize: number;
}

export default class BorrowRepository extends RepositoryBase {
  public async listTitle(content: ListBorrow): Promise<unknown | unknown[]> {
    try {
      let filter = {
        relations: [
          'titlePublisher',
          'titlePublisher.title',
        ],
        skip: content.pageStart || 0,
        take: content.pageSize || 10,
        order: {
          estimatedReturn: 'ASC'
        }
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
