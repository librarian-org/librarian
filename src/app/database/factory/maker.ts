import { Book } from "../models/book.schema";
import { App } from "../repository/App";

class Maker {
  static make(connection: any, model: string) {
    const typeOrmRepository = connection.getRepository(model);
    const dynamicRepository = new App(typeOrmRepository);
    return dynamicRepository;
  }
}

export default Maker;
