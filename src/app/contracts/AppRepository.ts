export interface AppRepository {
  add(content: object): any;
  edit(content: object): any;
  delete(content: object): any;
  show(content: object): any;
  getAll(content: object): any;
}
