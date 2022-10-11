import { getConnection } from 'typeorm';
import RepositoryBase from '../../RepositoryBase';

export class ActiveBorrowsRepository extends RepositoryBase {
  private static instance: ActiveBorrowsRepository = null;

  static repositoryName = 'ActiveBorrows';

  private constructor() {
    super();
    this.repository = getConnection().getRepository('Borrow');
  }

  public static getInstance(): ActiveBorrowsRepository {
    if (!ActiveBorrowsRepository.instance) {
      ActiveBorrowsRepository.instance = new ActiveBorrowsRepository();
    }

    return ActiveBorrowsRepository.instance;
  }

  public async execute(): Promise<unknown> {
    try {
      return await this.repository.count({
        where: {
          returnedAt: null,
          isReservation: false,
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
