import typeORM from 'typeorm';

export interface Repository {
  create(content: unknown): any;
  update(content: unknown): any;
  delete(condition: unknown): Promise<typeORM.DeleteResult>;
  read(content: unknown): any;
  list(content: unknown): any;
}
