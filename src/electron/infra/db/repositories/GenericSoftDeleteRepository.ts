import RepositoryBase from '../RepositoryBase';
import typeORM from 'typeorm';

export class GenericSoftDeleteRepository extends RepositoryBase {
  private static instance: GenericSoftDeleteRepository = null;

  static repositoryName = 'GenericSoftDelete';

  private constructor() {
    super();
  }

  public static getInstance(typeOrm: typeORM.Repository<unknown>): GenericSoftDeleteRepository {
    if (!GenericSoftDeleteRepository.instance) {
      GenericSoftDeleteRepository.instance = new GenericSoftDeleteRepository();
      GenericSoftDeleteRepository.instance.repository = typeOrm;
    }

    return GenericSoftDeleteRepository.instance;
  }

  public async execute(content: unknown): Promise<unknown> {
    try {
      const item = await this.repository.create(content);
      await this.repository.softRemove(item);
      return this.repository.find();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
