import typeORM from 'typeorm';
import RepositoryBase from '../../RepositoryBase';
import { BorrowStatus } from '../../../../../common/BorrowStatus';

export class ListEditionRepository extends RepositoryBase {
  private static instance: ListEditionRepository = null;

  static repositoryName = 'ListEdition';

  private constructor() {
    super();
  }

  public static getInstance(
    typeOrm: typeORM.Repository<unknown>
  ): ListEditionRepository {
    if (!ListEditionRepository.instance) {
      ListEditionRepository.instance = new ListEditionRepository();
    }

    ListEditionRepository.instance.repository = typeOrm;

    return ListEditionRepository.instance;
  }

  public async execute(): Promise<unknown> {
    try {
      const freeTitles = await this.repository
        .createQueryBuilder('titlePublisher')
        .innerJoinAndSelect('titlePublisher.title', 'title')
        .leftJoinAndSelect('titlePublisher.borrow', 'borrow')
        .where('borrow.isReservation IS NULL')
        .orWhere((qb) => {
          const subQuery = qb
            .subQuery()
            .select('borrow.Id')
            .from('borrow', 'borrow')
            .where('borrow.status IN (:...ids)', {
              ids: [BorrowStatus.Returned, BorrowStatus.LateReturned],
            })
            .getQuery();

          return `"titlePublisher"."id" IN ${subQuery}`;
        })
        .getMany();

      return freeTitles;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
