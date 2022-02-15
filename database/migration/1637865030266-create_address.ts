import { MigrationInterface, QueryRunner } from 'typeorm';
import { TableForeignKeyPatch } from '../TableForeignKeyPatch';
import { TablePatch } from '../TablePatch';

export class createAddress1637865030266 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new TablePatch({
        name: 'address',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
          },
          {
            name: 'complement',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'number',
            type: 'varchar',
          },
          {
            name: 'zipcode',
            type: 'varchar',
          },
          {
            name: 'neighborhood',
            type: 'varchar',
          },
          {
            name: 'publicPlace',
            type: 'varchar',
          },
          {
            name: 'cityId',
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
      'address',
      new TableForeignKeyPatch({
        columnNames: ['cityId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'city',
        onDelete: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'address',
      new TableForeignKeyPatch({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('address');

    const userId = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('userId') !== -1
    );
    await queryRunner.dropForeignKey('address', userId);

    const cityId = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('cityId') !== -1
    );
    await queryRunner.dropForeignKey('address', cityId);

    await queryRunner.dropTable('address');
  }
}
