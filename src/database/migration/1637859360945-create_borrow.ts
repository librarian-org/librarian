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
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'borrow',
            type: 'varchar',
          },
          {
            name: 'estimatedReturn',
            type: 'varchar',
          },
          {
            name: 'returnedAt',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'int',
          },
          {
            name: 'isReserva',
            type: 'boolean',
            default: false,
          },
          {
            name: 'titlePublisherId',
            type: 'int',
          },
          {
            name: 'userId',
            type: 'int',
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
