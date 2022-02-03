import RepositoryBase from './RepositoryBase';
import bcrypt from 'bcrypt';
import { User } from '../models/User.schema';

interface Where {
  where: unknown;
  password: string;
}

export default class UserRepository extends RepositoryBase {
  public async login(content: Where): Promise<unknown | unknown[]> {
    try {

      const user = await this.repository.findOne(content.where) as User;

      if (user && bcrypt.compareSync(content.password, user.password)) {
        return user;
      }

      return false;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
