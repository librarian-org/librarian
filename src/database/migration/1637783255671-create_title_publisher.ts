import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createTitlePublisher1637783255671 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'titlePublisher',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'classification',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'edition',
            type: 'int',
          },
          {
            name: 'publishedAt',
            type: 'varchar',
          },
          {
            name: 'titleId',
            type: 'int',
          },
          {
            name: 'publisherId',
            type: 'int',
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      'titlePublisher',
      new TableForeignKey({
        columnNames: ['titleId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'title',
        onDelete: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'titlePublisher',
      new TableForeignKey({
        columnNames: ['publisherId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'publisher',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('titlePublisher');

    const titleId = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('titleId') !== -1
    );
    await queryRunner.dropForeignKey('titlePublisher', titleId);

    const publisherId = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('publisherId') !== -1
    );
    await queryRunner.dropForeignKey('titlePublisher', publisherId);

    await queryRunner.dropTable('titlePublisher');
  }
}
