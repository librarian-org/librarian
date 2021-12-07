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
        name: 'title_publisher',
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
      'title_publisher',
      new TableForeignKey({
        columnNames: ['titleId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'title',
        onDelete: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'title_publisher',
      new TableForeignKey({
        columnNames: ['publisherId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'publisher',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('title_publisher');

    const titleId = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('titleId') !== -1
    );
    await queryRunner.dropForeignKey('title_publisher', titleId);

    const publisherId = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('publisherId') !== -1
    );
    await queryRunner.dropForeignKey('title_publisher', publisherId);

    await queryRunner.dropTable('title_publisher');
  }
}
