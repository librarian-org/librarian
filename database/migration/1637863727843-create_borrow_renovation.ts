import { MigrationInterface, QueryRunner } from 'typeorm';
import { TableForeignKeyPatch } from '../TableForeignKeyPatch';
import { TablePatch } from '../TablePatch';

export class createBorrowRenovation1637863727843 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new TablePatch({
        name: 'borrow_renovation',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
          },
          {
            name: 'borrowedAt',
            type: 'date',
          },
          {
            name: 'renewedAt',
            type: 'date',
          },
          {
            name: 'returnedAt',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'borrowId',
            type: 'integer',
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      'borrow_renovation',
      new TableForeignKeyPatch({
        columnNames: ['borrowId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'borrow',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('borrow_renovation');

    const borrowId = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('borrowId') !== -1
    );
    await queryRunner.dropForeignKey('borrow_renovation', borrowId);

    await queryRunner.dropTable('borrow_renovation');
  }
}
