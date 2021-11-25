import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createBorrow1637859360945 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
            name: 'estimated_return',
            type: 'varchar',
          },
          {
            name: 'returned_at',
            type: 'varchar',
          },
          {
            name: 'status',
            type: 'int',
          },
          {
            name: 'is_reserva',
            type: 'boolean',
          },
          {
            name: 'title_publisher_id',
            type: 'int',
          },
          {
            name: 'user_id',
            type: 'int',
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      'borrow',
      new TableForeignKey({
        columnNames: ['title_publisher_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'title_publisher',
        onDelete: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'borrow',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('borrow');

    const userId = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('user_id') !== -1
    );
    await queryRunner.dropForeignKey('borrow', userId);

    const titlePublisherId = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('title_publisher_id') !== -1
    );
    await queryRunner.dropForeignKey('borrow', titlePublisherId);

    await queryRunner.dropTable('borrow');
  }
}
