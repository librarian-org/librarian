import { Repository } from '../../contracts/Repository';
import typeORM from 'typeorm';

export default class RepositoryBase implements Repository {
  protected repository;

  constructor(typeOrm: typeORM.Repository<unknown>) {
    this.repository = typeOrm;
    return this;
  }

  public async create(content: unknown): Promise<unknown | unknown[]> {
    try {
      const item = await this.repository.create(content);
      return await this.repository.save(item);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  public async update(content: unknown): Promise<unknown | unknown[]> {
    try {
      return await this.repository.save(content);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  public async softDelete(content: unknown): Promise<unknown | unknown[]> {
    try {
      const item = await this.repository.create(content);
      await this.repository.softRemove(item);
      return this.repository.find();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  public async delete(condition: unknown): Promise<typeORM.DeleteResult> {
    try {
      return await this.repository.delete(condition);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  public async read(content: unknown): Promise<unknown | unknown[]> {
    try {
      let filter = {};
      if (content) {
        filter = { ...filter, ...{ content } };
      }
      return await this.repository.find(filter);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  public async list(content: unknown): Promise<unknown | unknown[]> {
    try {
      const filter = content ? { where: content } : {};
      return await this.repository.find(filter);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
