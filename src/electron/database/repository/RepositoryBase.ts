import { Repository } from '../../contracts/Repository';

export default class RepositoryBase implements Repository {
  private repository;

  constructor(typeOrm: any) {
    this.repository = typeOrm;
    return this;
  }

  public async create(content: unknown): Promise<any> {
    try {
      const item = await this.repository.create(content);
      return await this.repository.save(item);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  public async update(content: unknown): Promise<any> {
    try {
      await this.repository.save(content);
      return this.repository.find();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  public async delete(content: unknown): Promise<any> {
    try {
      const item = await this.repository.create(content);
      await this.repository.remove(item);
      return this.repository.find();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  public async read(content: unknown): Promise<any> {
    try {
      return await this.repository.find({ where: { id: content } });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  public async list(content: unknown): Promise<any> {
    try {
      const filter = content ? { where: content } : {};
      return await this.repository.find(filter);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
