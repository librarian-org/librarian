import RepositoryBase from '../../RepositoryBase';
import typeORM from 'typeorm';
import { BorrowStatus } from '../../../../../common/BorrowStatus';
import { Borrow } from '../../../../database/models/Borrow.schema';

interface Where {
  where: unknown;
}

export class ReturnsRepository extends RepositoryBase {
  private static instance: ReturnsRepository = null;

  static repositoryName = 'Returns';

  private constructor() {
    super();
  }

  public static getInstance(typeOrm: typeORM.Repository<unknown>): ReturnsRepository {
    if (!ReturnsRepository.instance) {
      ReturnsRepository.instance = new ReturnsRepository();
    }

    ReturnsRepository.instance.repository = typeOrm;

    return ReturnsRepository.instance;
  }

  public async execute(params: Where): Promise<unknown> {
    try {
      const returned = (await this.repository.findOne({
        where: params.where,
      })) as Borrow;

      const today = new Date();
      returned.status = BorrowStatus.Returned;
      if (returned.estimatedReturn < today) {
        returned.status = BorrowStatus.LateReturned;
      }

      returned.returnedAt = today;
      await this.repository.save(returned);

      return returned;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
