import { Connection } from 'typeorm';
import RepositoryBase from '../repository/RepositoryBase';

class Factory {
  static make(connection: Connection, model: string): RepositoryBase {
    const typeOrmRepository = connection.getRepository(model);
    const dynamicRepository = new RepositoryBase(typeOrmRepository);
    return dynamicRepository;
  }
}

export default Factory;
