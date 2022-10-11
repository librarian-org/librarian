import RepositoryBase from '../../RepositoryBase';
import { getConnection } from 'typeorm';

export class RegisteredPeopleRepository extends RepositoryBase {
  private static instance: RegisteredPeopleRepository = null;

  static repositoryName = 'RegisteredPeople';

  private constructor() {
    super();
    this.repository = getConnection().getRepository('User');
  }

  public static getInstance(): RegisteredPeopleRepository {
    if (!RegisteredPeopleRepository.instance) {
      RegisteredPeopleRepository.instance = new RegisteredPeopleRepository();
    }

    return RegisteredPeopleRepository.instance;
  }

  public async execute(): Promise<unknown> {
    try {
      return await this.repository.count();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
