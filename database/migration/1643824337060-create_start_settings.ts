import { MigrationInterface, QueryRunner } from 'typeorm';

export class createStartSettings1643824337060 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('settings', [
        'id',
        'daysReturnDate',
        'backupPath',
      ])
      .values({
        id: 1,
        daysReturnDate: 7,
        allowedRenovations: 3,
        backupPath: 'admin',
      })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('settings')
      .where({ id: 1 })
      .execute();
  }
}
