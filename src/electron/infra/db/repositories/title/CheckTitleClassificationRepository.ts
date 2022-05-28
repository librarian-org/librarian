import RepositoryBase from '../../RepositoryBase';
import typeORM from 'typeorm';

interface Where {
  where: unknown;
}

export class CheckTitleClassificationRepository extends RepositoryBase {
  private static instance: CheckTitleClassificationRepository = null;

  static repositoryName = 'CheckTitleClassification';

  private constructor() {
    super();
  }

  public static getInstance(
    typeOrm: typeORM.Repository<unknown>
  ): CheckTitleClassificationRepository {
    if (!CheckTitleClassificationRepository.instance) {
      CheckTitleClassificationRepository.instance =
        new CheckTitleClassificationRepository();
    }

    CheckTitleClassificationRepository.instance.repository = typeOrm;

    return CheckTitleClassificationRepository.instance;
  }

  public async execute(content: Where): Promise<unknown> {
    try {
      const classifictaionWithTitle = await this.repository.findOne({
        relations: ['title'],
        where: content.where,
      });

      return classifictaionWithTitle;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
