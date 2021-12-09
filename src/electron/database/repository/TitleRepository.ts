import RepositoryBase from './RepositoryBase';

export default class TitleRepository extends RepositoryBase {

  public async list(content: unknown): Promise<unknown | unknown[]> {    try {
      const filter = content ? { where: content } : {};
      return await this.repository.find(filter);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
