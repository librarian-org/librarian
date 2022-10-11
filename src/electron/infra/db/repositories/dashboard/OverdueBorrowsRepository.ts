import RepositoryBase from '../../RepositoryBase';
import { getConnection, LessThan } from 'typeorm';
import { DateUtils } from 'typeorm/util/DateUtils';

export class OverdueBorrowsRepository extends RepositoryBase {
  private static instance: OverdueBorrowsRepository = null;

  static repositoryName = 'OverdueBorrows';

  private constructor() {
    super();
    this.repository = getConnection().getRepository('Borrow');
  }

  public static getInstance(): OverdueBorrowsRepository {
    if (!OverdueBorrowsRepository.instance) {
      OverdueBorrowsRepository.instance = new OverdueBorrowsRepository();
    }
    return OverdueBorrowsRepository.instance;
  }

  public async execute(): Promise<unknown> {
    try {
      return await this.repository.count({
        where: {
          returnedAt: null,
          estimatedReturn: LessThan(
            DateUtils.mixedDateToUtcDatetimeString(new Date())
          ),
          isReservation: false,
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
