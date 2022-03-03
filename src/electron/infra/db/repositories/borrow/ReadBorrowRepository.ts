import RepositoryBase from '../../RepositoryBase';
import typeORM from 'typeorm';

export class ReadBorrowRepository extends RepositoryBase {
  private static instance: ReadBorrowRepository = null;

  static repositoryName = 'ReadBorrow';

  private constructor() {
    super();
  }

  public static getInstance(typeOrm: typeORM.Repository<unknown>): ReadBorrowRepository {
    if (!ReadBorrowRepository.instance) {
      ReadBorrowRepository.instance = new ReadBorrowRepository();
    }

    ReadBorrowRepository.instance.repository = typeOrm;

    return ReadBorrowRepository.instance;
  }

  public async execute(titlePublisherId: string): Promise<unknown> {
    try {
      const borrowed = this.repository
        .createQueryBuilder('borrow')
        .where('titlePublisherId = :titlePublisherId', {
          titlePublisherId,
        })
        .andWhere('borrow.returnedAt IS NULL')
        .getOne();

      return borrowed;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
