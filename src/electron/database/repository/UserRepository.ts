import RepositoryBase from './RepositoryBase';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.schema';

interface Where {
  where: unknown;
  password: string;
}

interface Create {
  name: string;
  login: string;
  password?: string;
  language: string;
  notes: string;
  document: string;
  userTypeId: string;
}

interface Update extends Create {
  id: string;
}

export default class UserRepository extends RepositoryBase {
  public async create(content: Create): Promise<unknown | unknown[]> {
    try {
      const entity: Create = {
        name: content.name,
        login: content.login,
        password: await bcrypt.hash(content.password, 12),
        language: content.language,
        notes: content.notes,
        document: content.document,
        userTypeId: content.userTypeId,
      };

      const item = await this.repository.create(entity);
      return await this.repository.save(item);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  public async update(content: Update): Promise<unknown | unknown[]> {
    try {
      let entity: Update = {
        id: content.id,
        name: content.name,
        login: content.login,
        language: content.language,
        notes: content.notes,
        document: content.document,
        userTypeId: content.userTypeId,
      };

      if (content.password) {
        entity = {
          ...entity,
          ...{ password: await bcrypt.hash(content.password, 12) },
        };
      }

      return await this.repository.save(entity);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  public async login(content: Where): Promise<unknown | unknown[]> {
    try {
      const user = (await this.repository.findOne(content.where)) as User;

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
