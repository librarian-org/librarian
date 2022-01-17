import { MigrationInterface, QueryRunner } from 'typeorm';
import { TableForeignKeyPatch } from '../TableForeignKeyPatch';
import { TablePatch } from '../TablePatch';

export class createPermission1637860238626 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new TablePatch({
        name: 'permission',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'save',
            type: 'boolean',
            default: false,
          },
          {
            name: 'delete',
            type: 'boolean',
            default: false,
          },
          {
            name: 'read',
            type: 'boolean',
            default: false,
          },
          {
            name: 'programId',
            type: 'int',
          },
          {
            name: 'profileId',
            type: 'int',
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      'permission',
      new TableForeignKeyPatch({
        columnNames: ['programId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'program',
        onDelete: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'permission',
      new TableForeignKeyPatch({
        columnNames: ['profileId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'profile',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('permission');

    const profileId = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('profileId') !== -1
    );
    await queryRunner.dropForeignKey('permission', profileId);

    const programId = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('programId') !== -1
    );
    await queryRunner.dropForeignKey('permission', programId);

    await queryRunner.dropTable('permission');
  }
}
