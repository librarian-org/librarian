import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createAddress1637865030266 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'address',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'complement',
            type: 'varchar',
          },
          {
            name: 'zip_code',
            type: 'varchar',
          },
          {
            name: 'neighborhood',
            type: 'varchar',
          },
          {
            name: 'public_place',
            type: 'varchar',
          },
          {
            name: 'city_id',
            type: 'int',
          },
          {
            name: 'user_id',
            type: 'int',
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      'address',
      new TableForeignKey({
        columnNames: ['city_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'city',
        onDelete: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'address',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('address');

    const userId = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('user_id') !== -1
    );
    await queryRunner.dropForeignKey('address', userId);

    const cityId = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('city_id') !== -1
    );
    await queryRunner.dropForeignKey('address', cityId);

    await queryRunner.dropTable('address');
  }
}
