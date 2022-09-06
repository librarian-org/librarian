import RepositoryBase from '../../RepositoryBase';
import { getConnection } from 'typeorm';

export class RegisteredSamplesRepository extends RepositoryBase {
  private static instance: RegisteredSamplesRepository = null;

  static repositoryName = 'RegisteredSamples';

  private constructor() {
    super();
    this.repository = getConnection().getRepository('TitlePublisher');
  }

  public static getInstance(): RegisteredSamplesRepository {
    if (!RegisteredSamplesRepository.instance) {
      RegisteredSamplesRepository.instance = new RegisteredSamplesRepository();
    }

    return RegisteredSamplesRepository.instance;
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
