import { Repository } from '../../contracts/Repository';

export default class RepositoryBase implements Repository {
  private repository;

  constructor(typeOrm: any) {
    this.repository = typeOrm;
    return this;
  }

  public async create(content: unknown) {
    try {
      const item = await this.repository.create(content);
      await this.repository.save(item);
      return this.repository.find();
    } catch (err) {
      throw err;
    }
  }

  public async update(content: unknown) {
    try {
      await this.repository.save(content);
      return this.repository.find();
    } catch (err) {
      throw err;
    }
  }

  public async delete(content: unknown) {
    try {
      const item = await this.repository.create(content);
      await this.repository.remove(item);
      return this.repository.find();
    } catch (err) {
      throw err;
    }
  }

  public async read(content: unknown) {
    try {
      return await this.repository.find({ where: { id: content } });
    } catch (err) {
      throw err;
    }
  }

  public async list(content: unknown) {
    try {
      const filter = content ? { where: content } : {};
      return await this.repository.find(filter);
    } catch (err) {
      throw err;
    }
  }
}
