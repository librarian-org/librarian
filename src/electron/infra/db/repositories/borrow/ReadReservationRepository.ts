import RepositoryBase from '../../RepositoryBase';
import typeORM from 'typeorm';

export class ReadReservationRepository extends RepositoryBase {
  private static instance: ReadReservationRepository = null;

  static repositoryName = 'ReadReservation';

  private constructor() {
    super();
  }

  public static getInstance(typeOrm: typeORM.Repository<unknown>): ReadReservationRepository {
    if (!ReadReservationRepository.instance) {
      ReadReservationRepository.instance = new ReadReservationRepository();
    }

    ReadReservationRepository.instance.repository = typeOrm;

    return ReadReservationRepository.instance;
  }

  public async execute(titlePublisherId: string): Promise<unknown> {
    try {
      const reserved = this.repository
        .createQueryBuilder('borrow')
        .where('titlePublisherId = :titlePublisherId', {
          titlePublisherId,
        })
        .andWhere('borrow.isReservation = 1')
        .getOne();

      return reserved;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
