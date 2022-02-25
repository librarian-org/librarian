import RepositoryBase from '../../../infra/db/RepositoryBase';
import typeORM from 'typeorm';


export interface Repository {
  repository: typeORM.Repository<unknown>;
  getInstance(): RepositoryBase;
  execute(content: unknown): Promise<unknown | unknown[]>;
}
