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

export class UserCreateRepository extends RepositoryBase {
  private static instance: UserCreateRepository = null;

  static repositoryName = 'UserCreate';

  private constructor() {
    super();
  }

  public static getInstance(typeOrm: typeORM.Repository<unknown>): UserCreateRepository {
    if (!UserCreateRepository.instance) {
      UserCreateRepository.instance = new UserCreateRepository();
    }

    UserCreateRepository.instance.repository = typeOrm;

    return UserCreateRepository.instance;
  }

  public async execute(content: Create): Promise<unknown> {
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
}
