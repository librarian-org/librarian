import { MigrationInterface, QueryRunner } from 'typeorm';
import { TableForeignKeyPatch } from '../TableForeignKeyPatch';
import { TablePatch } from '../TablePatch';

export class createUserProfile1637775857589 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new TablePatch({
        name: 'user_profile',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
          },
          {
            name: 'userId',
            type: 'integer',
          },
          {
            name: 'profileId',
            type: 'integer',
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      'user_profile',
      new TableForeignKeyPatch({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'user_profile',
      new TableForeignKeyPatch({
        columnNames: ['profileId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'profile',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('user_profile');

    const profileId = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('profileId') !== -1
    );
    await queryRunner.dropForeignKey('user_profile', profileId);

    const userId = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('userId') !== -1
    );
    await queryRunner.dropForeignKey('user_profile', userId);

    await queryRunner.dropTable('user_profile');
  }
}
