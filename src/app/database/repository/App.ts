import { Repository } from "typeorm";
import { AppRepository } from "../../contracts/AppRepository";

interface ObjectDto {
  value: any;
}

export class App implements AppRepository {
  private repository;

  constructor(typeOrm: any) {
    this.repository = typeOrm;
    return this;
  }

  public async add(content: object) {
    try {
      const item = await this.repository.create(content);
      await this.repository.save(item);
      return this.repository.find();
    } catch (err) {
      throw err;
    }
  }

  public async edit(content: object) {
    try {
      await this.repository.save(content);
      return this.repository.find();
    } catch (err) {
      throw err;
    }
  }

  public async delete(content: object) {
    try {
      const item = await this.repository.create(content);
      await this.repository.remove(item);
      return this.repository.find();
    } catch (err) {
      throw err;
    }
  }

  public async show(content: object) {
    try {
      return await this.repository.find({ where: { id: content } });
    } catch (err) {
      throw err;
    }
  }

  public async getAll(content: ObjectDto) {
    try {
      const filter = content.value ? { where: content.value } : {};
      return await this.repository.find(filter);
    } catch (err) {
      throw err;
    }
  }
}

export default AppRepository;
