import RepositoryBase from '../RepositoryBase';
import typeORM from 'typeorm';

export class GenericCreateRepository extends RepositoryBase {
  private static instance: GenericCreateRepository = null;

  static repositoryName = 'GenericCreate';

  private constructor() {
    super();
  }

  public static getInstance(typeOrm: typeORM.Repository<unknown>): GenericCreateRepository {
    if (!GenericCreateRepository.instance) {
      GenericCreateRepository.instance = new GenericCreateRepository();
      GenericCreateRepository.instance.repository = typeOrm;
    }

    return GenericCreateRepository.instance;
  }

  public async execute(content: unknown): Promise<unknown> {
    try {
      const item = await this.repository.create(content);
      return await this.repository.save(item);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
