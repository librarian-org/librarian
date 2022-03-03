import typeORM from 'typeorm';
import { addDays } from 'date-fns';
import RepositoryBase from '../../RepositoryBase';
import { BorrowStatus } from '../../../../../common/BorrowStatus';
import { Borrow } from '../../../../database/models/Borrow.schema';

interface Where {
  where: unknown;
}

interface Renovation extends Where {
  config: {
    daysReturnDate: string;
  };
}

export class BorrowByReservationRepository extends RepositoryBase {
  private static instance: BorrowByReservationRepository = null;

  static repositoryName = 'BorrowByReservation';

  private constructor() {
    super();
  }

  public static getInstance(typeOrm: typeORM.Repository<unknown>): BorrowByReservationRepository {
    if (!BorrowByReservationRepository.instance) {
      BorrowByReservationRepository.instance = new BorrowByReservationRepository();
    }

    BorrowByReservationRepository.instance.repository = typeOrm;

    return BorrowByReservationRepository.instance;
  }

  public async execute(params: Renovation): Promise<unknown> {
    try {
      const reserved = (await this.repository.findOne(params.where)) as Borrow;

      const today = new Date();
      reserved.status = BorrowStatus.BorrowedByReservation;
      reserved.isReservation = false;
      reserved.borrow = today;
      reserved.estimatedReturn = addDays(
        today,
        parseInt(params.config.daysReturnDate)
      );
      await this.repository.save(reserved);

      return reserved;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
