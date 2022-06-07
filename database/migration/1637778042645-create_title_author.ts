import { MigrationInterface, QueryRunner } from 'typeorm';
import { TableForeignKeyPatch } from '../TableForeignKeyPatch';
import { TablePatch } from '../TablePatch';

export class createTitleAuthor1637778042645 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new TablePatch({
        name: 'title_author',
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
            name: 'authorId',
            type: 'integer',
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      'title_author',
      new TableForeignKeyPatch({
        columnNames: ['titleId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'title',
        onDelete: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'title_author',
      new TableForeignKeyPatch({
        columnNames: ['authorId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'author',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('title_author');

    const categoryId = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('authorId') !== -1
    );
    await queryRunner.dropForeignKey('title_author', categoryId);

    const titleId = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('titleId') !== -1
    );
    await queryRunner.dropForeignKey('title_author', titleId);

    await queryRunner.dropTable('title_author');
  }
}
