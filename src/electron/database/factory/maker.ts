import RepositoryBase from '../repository/RepositoryBase';

class Maker {
  static make(connection: any, model: string) {
    const typeOrmRepository = connection.getRepository(model);
    const dynamicRepository = new RepositoryBase(typeOrmRepository);
    return dynamicRepository;
  }
}

export default Maker;
