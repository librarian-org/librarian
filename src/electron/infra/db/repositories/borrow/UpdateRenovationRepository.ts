import RepositoryBase from '../../RepositoryBase';
import { addDays } from 'date-fns';
import typeORM, { getRepository } from 'typeorm';
import { Borrow } from '../../../../database/models/Borrow.schema';
import { BorrowRenovation } from '../../../../database/models/BorrowRenovation.schema';

interface Where {
  where: unknown;
}

interface Renovation extends Where {
  config: {
    daysReturnDate: string;
  };
}

export class UodateRenovationRepository extends RepositoryBase {
  private static instance: UodateRenovationRepository = null;

  static repositoryName = 'UpdateRenovation';

  private constructor() {
    super();
  }

  public static getInstance(
    typeOrm: typeORM.Repository<unknown>
  ): UodateRenovationRepository {
    if (!UodateRenovationRepository.instance) {
      UodateRenovationRepository.instance = new UodateRenovationRepository();
    }

    UodateRenovationRepository.instance.repository = typeOrm;

    return UodateRenovationRepository.instance;
  }

  public async execute(params: Renovation): Promise<unknown> {
    try {
      const borrowed = (await this.repository.findOne({
        where: params.where,
      })) as Borrow;

      const renovationRepository = getRepository(BorrowRenovation);
      await renovationRepository.save({
        borrowId: borrowed.id,
        borrowedAt: borrowed.borrow,
        renewedAt: new Date(),
        returnedAt: null,
      });

      const newEstimated = addDays(
        borrowed.estimatedReturn,
        parseInt(params.config.daysReturnDate)
      );
      borrowed.estimatedReturn = newEstimated;

      await this.repository.save(borrowed);

      return borrowed;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
