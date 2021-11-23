export interface Repository {
  create(content: unknown): any;
  update(content: unknown): any;
  delete(content: unknown): any;
  read(content: unknown): any;
  list(content: unknown): any;
}
