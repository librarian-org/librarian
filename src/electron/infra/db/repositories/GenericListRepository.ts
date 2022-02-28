import RepositoryBase from '../RepositoryBase';
import typeORM from 'typeorm';

export class GenericListRepository extends RepositoryBase {
  private static instance: GenericListRepository = null;

  static repositoryName = 'GenericList';

  private constructor() {
    super();
  }

  public static getInstance(typeOrm: typeORM.Repository<unknown>): GenericListRepository {
    if (!GenericListRepository.instance) {
      GenericListRepository.instance = new GenericListRepository();
    }

    GenericListRepository.instance.repository = typeOrm;

    return GenericListRepository.instance;
  }

  public async execute(content: unknown): Promise<unknown> {
    try {
      const filter = content ? { where: content } : {};
      return await this.repository.find(filter);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
