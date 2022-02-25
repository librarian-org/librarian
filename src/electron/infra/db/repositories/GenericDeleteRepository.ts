import RepositoryBase from '../RepositoryBase';
import typeORM from 'typeorm';

export class GenericDeleteRepository extends RepositoryBase {
  private static instance: GenericDeleteRepository = null;

  static repositoryName = 'GenericDelete';

  private constructor() {
    super();
  }

  public static getInstance(typeOrm: typeORM.Repository<unknown>): GenericDeleteRepository {
    if (!GenericDeleteRepository.instance) {
      GenericDeleteRepository.instance = new GenericDeleteRepository();
      GenericDeleteRepository.instance.repository = typeOrm;
    }

    return GenericDeleteRepository.instance;
  }

  public async execute(content: unknown): Promise<unknown> {
    try {
      return await this.repository.delete(content);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
