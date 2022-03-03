import { Connection } from 'typeorm';
import { Repository } from '../../../data/protocols';
import * as AllRepositories from '../repositories';

interface Product {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export default class RepositoryFactory {
  private products: Product = {};

  constructor(private connection: Connection) {
    this.loadRepositories();
  }

  private loadRepositories(): void {
    Object.entries(AllRepositories).map((repository) => {
      this.products[repository[1].repositoryName] = repository[1];
    });
  }

  public make(repository: string, entity: string): Repository {
    const typeOrmRepository = this.connection.getRepository(entity);
    const dynamicRepository = this.products[repository].getInstance(typeOrmRepository);

    return dynamicRepository;
  }
}
