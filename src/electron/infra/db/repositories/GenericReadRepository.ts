import RepositoryBase from '../RepositoryBase';
import typeORM from 'typeorm';

export class GenericReadRepository extends RepositoryBase {
  private static instance: GenericReadRepository = null;

  static repositoryName = 'GenericRead';

  private constructor() {
    super();
  }

  public static getInstance(typeOrm: typeORM.Repository<unknown>): GenericReadRepository {
    if (!GenericReadRepository.instance) {
      GenericReadRepository.instance = new GenericReadRepository();
    }

    GenericReadRepository.instance.repository = typeOrm;

    return GenericReadRepository.instance;
  }

  public async execute(content: unknown): Promise<unknown> {
    try {
      let filter = {};
      if (content) {
        filter = { ...filter, ...{ content } };
      }
      return await this.repository.find(filter);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
