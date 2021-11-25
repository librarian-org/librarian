import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class createCity1637862771380 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'city',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'region_id',
            type: 'int',
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      'city',
      new TableForeignKey({
        columnNames: ['region_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'region',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('city');

    const regionId = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('region_id') !== -1
    );
    await queryRunner.dropForeignKey('city', regionId);

    await queryRunner.dropTable('city');
  }
}
