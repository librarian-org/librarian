import RepositoryBase from '../RepositoryBase';
import typeORM from 'typeorm';

export class GlobalSearchRepository extends RepositoryBase {
  private static instance: GlobalSearchRepository = null;

  static repositoryName = 'GlobalSearch';

  private constructor() {
    super();
  }

  public static getInstance(typeOrm: typeORM.Repository<unknown>): GlobalSearchRepository {
    if (!GlobalSearchRepository.instance) {
      GlobalSearchRepository.instance = new GlobalSearchRepository();
    }

    GlobalSearchRepository.instance.repository = typeOrm;

    return GlobalSearchRepository.instance;
  }

  public async execute(content: unknown): Promise<unknown> {
    try {
      return [];
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
