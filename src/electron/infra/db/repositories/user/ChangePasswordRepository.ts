import typeORM from 'typeorm';
import bcrypt from 'bcryptjs';
import RepositoryBase from '../../RepositoryBase';
import { User } from '../../../../database/models/User.schema';

interface ChangePassword {
  userId: string;
  password: string;
  newPassword: string;
}

export class ChangePasswordRepository extends RepositoryBase {
  private static instance: ChangePasswordRepository = null;

  static repositoryName = 'ChangePassword';

  private constructor() {
    super();
  }

  public static getInstance(typeOrm: typeORM.Repository<unknown>): ChangePasswordRepository {
    if (!ChangePasswordRepository.instance) {
      ChangePasswordRepository.instance = new ChangePasswordRepository();
    }

    ChangePasswordRepository.instance.repository = typeOrm;

    return ChangePasswordRepository.instance;
  }

  public async execute(content: ChangePassword): Promise<unknown> {
    try {
      const user = (await this.repository.findOne({
        where: { id: content.userId },
      })) as User;

      if (user && bcrypt.compareSync(content.password, user.password)) {
        user.password = await bcrypt.hash(content.newPassword, 12);
        await this.repository.save(user);
        return user;
      }

      return false;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
