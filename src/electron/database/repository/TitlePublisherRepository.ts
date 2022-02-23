import RepositoryBase from './RepositoryBase';
import { BorrowStatus } from '../../../common/BorrowStatus';

interface ListTitlePublisher {
  where: unknown;
}

export default class TitlePublisherRepository extends RepositoryBase {
  public async listTitle(
    content: ListTitlePublisher
  ): Promise<unknown | unknown[]> {
    try {
      const reserved = await this.repository
        .createQueryBuilder('titlePublisher')
        .innerJoinAndSelect(
          'titlePublisher.title',
          'title'
        )
        .leftJoinAndSelect(
          'titlePublisher.borrow',
          'borrow'
        )
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

      console.log('RESULT: ', reserved);

      return reserved;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
