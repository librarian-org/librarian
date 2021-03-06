import { MigrationInterface, QueryRunner } from 'typeorm';
import { TableForeignKeyPatch } from '../TableForeignKeyPatch';
import { TablePatch } from '../TablePatch';

export class createContact1637781284674 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new TablePatch({
        name: 'contact',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
          },
          {
            name: 'info',
            type: 'varchar',
          },
          {
            name: 'contactTypeId',
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
      'contact',
      new TableForeignKeyPatch({
        columnNames: ['contactTypeId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'contact_type',
        onDelete: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'contact',
      new TableForeignKeyPatch({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('contact');

    const contactTypeId = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('contactTypeId') !== -1
    );
    await queryRunner.dropForeignKey('contact', contactTypeId);

    const userId = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('userId') !== -1
    );
    await queryRunner.dropForeignKey('contact', userId);

    await queryRunner.dropTable('contact');
  }
}
