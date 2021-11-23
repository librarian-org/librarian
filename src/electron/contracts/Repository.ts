export interface Repository {
  insert(content: unknown): any;
  edit(content: unknown): any;
  delete(content: unknown): any;
  show(content: unknown): any;
  list(content: unknown): any;
}
