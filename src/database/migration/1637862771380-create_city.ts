import { MigrationInterface, QueryRunner } from 'typeorm';
import { TableForeignKeyPatch } from '../TableForeignKeyPatch';
import { TablePatch } from '../TablePatch';

export class createCity1637862771380 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new TablePatch({
        name: 'city',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'regionId',
            type: 'integer',
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      'city',
      new TableForeignKeyPatch({
        columnNames: ['regionId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'region',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('city');

    const regionId = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('regionId') !== -1
    );
    await queryRunner.dropForeignKey('city', regionId);

    await queryRunner.dropTable('city');
  }
}
