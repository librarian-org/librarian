import typeORM, { getConnection } from 'typeorm';
import RepositoryBase from '../../RepositoryBase';
import { BorrowStatus } from '../../../../../common/BorrowStatus';

export class ListBorrowedTitlesRepository extends RepositoryBase {
  private static instance: ListBorrowedTitlesRepository = null;

  static repositoryName = 'ListBorrowedTitles';

  private constructor() {
    super();
    this.repository = getConnection().getRepository('Borrow');
  }

  public static getInstance(): ListBorrowedTitlesRepository {
    if (!ListBorrowedTitlesRepository.instance) {
      ListBorrowedTitlesRepository.instance =
        new ListBorrowedTitlesRepository();
    }

    return ListBorrowedTitlesRepository.instance;
  }

  public async execute(): Promise<unknown> {
    try {
      const select = this.repository
        .createQueryBuilder('borrow')
        .innerJoinAndSelect('borrow.titlePublisher', 'publisher')
        .innerJoinAndSelect('borrow.user', 'user')
        .innerJoinAndSelect('publisher.title', 'title')
        .where('borrow.status IN (:...ids)', {
          ids: [BorrowStatus.Borrowed, BorrowStatus.BorrowedByReservation],
        })
        .orderBy({
          'borrow.borrow': 'ASC',
        });

      const data = await select.getMany();
      const count = await select.getCount();

      return { data, count };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
