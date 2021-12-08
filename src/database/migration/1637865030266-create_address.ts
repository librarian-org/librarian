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
            isNullable: true,
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
            type: 'int',
          },
          {
            name: 'userId',
            type: 'int',
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      'address',
      new TableForeignKey({
        columnNames: ['cityId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'city',
        onDelete: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'address',
      new TableForeignKey({
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
