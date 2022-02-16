import { MigrationInterface, QueryRunner } from 'typeorm';
import { TableForeignKeyPatch } from '../TableForeignKeyPatch';
import { TablePatch } from '../TablePatch';

export class createBorrow1637859360945 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new TablePatch({
        name: 'borrow',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
          },
          {
            name: 'borrow',
            type: 'date',
          },
          {
            name: 'estimatedReturn',
            type: 'date',
          },
          {
            name: 'returnedAt',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'integer',
          },
          {
            name: 'isReservation',
            type: 'boolean',
            default: false,
          },
          {
            name: 'titlePublisherId',
            type: 'integer',
          },
          {
            name: 'userId',
            type: 'integer',
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      'borrow',
      new TableForeignKeyPatch({
        columnNames: ['titlePublisherId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'title_publisher',
        onDelete: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'borrow',
      new TableForeignKeyPatch({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('borrow');

    const userId = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('userId') !== -1
    );
    await queryRunner.dropForeignKey('borrow', userId);

    const titlePublisherId = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('titlePublisherId') !== -1
    );
    await queryRunner.dropForeignKey('borrow', titlePublisherId);

    await queryRunner.dropTable('borrow');
  }
}
