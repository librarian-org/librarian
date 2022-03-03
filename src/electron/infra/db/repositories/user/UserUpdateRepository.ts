import typeORM from 'typeorm';
import bcrypt from 'bcryptjs';
import RepositoryBase from '../../RepositoryBase';

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

export class UserUpdateRepository extends RepositoryBase {
  private static instance: UserUpdateRepository = null;

  static repositoryName = 'UserUpdate';

  private constructor() {
    super();
  }

  public static getInstance(typeOrm: typeORM.Repository<unknown>): UserUpdateRepository {
    if (!UserUpdateRepository.instance) {
      UserUpdateRepository.instance = new UserUpdateRepository();
    }

    UserUpdateRepository.instance.repository = typeOrm;

    return UserUpdateRepository.instance;
  }

  public async execute(content: Update): Promise<unknown> {
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
}
