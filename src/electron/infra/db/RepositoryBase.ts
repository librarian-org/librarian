import typeORM from 'typeorm';
import { Repository } from '../../data/protocols';

export default class RepositoryBase implements Repository {
  static repositoryName: string;
  public repository: typeORM.Repository<unknown>;

  public getInstance(): RepositoryBase {
    throw new Error('Must be implemented on children classes.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async execute(content?: unknown): Promise<unknown> {
    throw new Error('Must be implemented on children classes.');
  }
}
