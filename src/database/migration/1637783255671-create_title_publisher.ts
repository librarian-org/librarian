import { MigrationInterface, QueryRunner } from 'typeorm';
import { TableForeignKeyPatch } from '../TableForeignKeyPatch';
import { TablePatch } from '../TablePatch';

export class createTitlePublisher1637783255671 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new TablePatch({
        name: 'title_publisher',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
          },
          {
            name: 'classification',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'edition',
            type: 'varchar',
          },
          {
            name: 'publishedAt',
            type: 'varchar',
          },
          {
            name: 'titleId',
            type: 'integer',
          },
          {
            name: 'publisherId',
            type: 'integer',
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      'title_publisher',
      new TableForeignKeyPatch({
        columnNames: ['titleId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'title',
        onDelete: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'title_publisher',
      new TableForeignKeyPatch({
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
