import { addDays } from 'date-fns';
import { BorrowStatus } from '../../../common/BorrowStatus';
import { getRepository } from 'typeorm';
import { Borrow } from '../models/Borrow.schema';
import { BorrowRenovation } from '../models/BorrowRenovation.schema';
import RepositoryBase from './RepositoryBase';

interface Where {
  where: unknown;
}

interface Pagination extends Where {
  pageStart: number;
  pageSize: number;
}

interface Renovation extends Where {
  config: {
    daysReturnDate: string;
  };
}

export default class BorrowRepository extends RepositoryBase {
  public async list(content: Pagination): Promise<unknown | unknown[]> {
    try {
      let filter = {
        relations: ['titlePublisher', 'titlePublisher.title', 'renovations'],
        skip: content.pageStart || 0,
        take: content.pageSize || 10,
        order: {
          estimatedReturn: 'ASC',
        },
      };

      if (content.where) {
        filter = { ...filter, ...{ where: content.where } };
      }

      const [data, count] = await this.repository.findAndCount(filter);

      return { data, count };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  public async read(titlePublisherId: string): Promise<unknown | unknown[]> {
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

  public async readReservation(
    titlePublisherId: string
  ): Promise<unknown | unknown[]> {
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

  public async updateRenovation(
    params: Renovation
  ): Promise<unknown | unknown[]> {
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

  public async returns(params: Where): Promise<unknown | unknown[]> {
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

  public async borrowByReservation(
    params: Renovation
  ): Promise<unknown | unknown[]> {
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
