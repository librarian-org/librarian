import { MigrationInterface, QueryRunner } from 'typeorm';
import { TableForeignKeyPatch } from '../TableForeignKeyPatch';
import { TablePatch } from '../TablePatch';

export class createTitleCategory1637777649127 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new TablePatch({
        name: 'title_category',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
          },
          {
            name: 'titleId',
            type: 'integer',
          },
          {
            name: 'categoryId',
            type: 'integer',
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      'title_category',
      new TableForeignKeyPatch({
        columnNames: ['titleId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'title',
        onDelete: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'title_category',
      new TableForeignKeyPatch({
        columnNames: ['categoryId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'category',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('title_category');

    const categoryId = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('categoryId') !== -1
    );
    await queryRunner.dropForeignKey('title_category', categoryId);

    const titleId = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('titleId') !== -1
    );
    await queryRunner.dropForeignKey('title_category', titleId);

    await queryRunner.dropTable('title_category');
  }
}
