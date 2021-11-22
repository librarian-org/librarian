import { Book } from '../models/book.schema';
import AppRepository from '../repository/app';

class Maker{
    static make(connection: any, model: string){
       const typeOrmRepository = connection.getRepository(model);
       const dynamicRepository = new AppRepository(typeOrmRepository);
       return dynamicRepository;
    }
}

export default Maker