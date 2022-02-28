import RepositoryBase from '../RepositoryBase';
import typeORM from 'typeorm';

export class GenericUpdateRepository extends RepositoryBase {
  private static instance: GenericUpdateRepository = null;

  static repositoryName = 'GenericUpdate';

  private constructor() {
    super();
  }

  public static getInstance(typeOrm: typeORM.Repository<unknown>): GenericUpdateRepository {
    if (!GenericUpdateRepository.instance) {
      GenericUpdateRepository.instance = new GenericUpdateRepository();
    }

    GenericUpdateRepository.instance.repository = typeOrm;

    return GenericUpdateRepository.instance;
  }

  public async execute(content: unknown): Promise<unknown> {
    try {
      return await this.repository.save(content);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
