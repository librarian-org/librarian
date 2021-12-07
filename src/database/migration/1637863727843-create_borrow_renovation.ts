import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createBorrowRenovation1637863727843 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'borrowRenovation',
            columns: [
              {
                name: 'id',
                type: 'int',
                isPrimary: true,
              },
              {
                name: 'borrowedAt',
                type: 'varchar',
              },
              {
                name: 'renewedAt',
                type: 'varchar',
              },
              {
                name: 'returnedAt',
                type: 'varchar',
                isNullable: true,
              },
              {
                name: 'borrowId',
                type: 'int',
              },
            ],
          }),
          true
        );
    
        await queryRunner.createForeignKey(
          'borrowRenovation',
          new TableForeignKey({
            columnNames: ['borrowId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'borrow',
            onDelete: 'CASCADE',
          })
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('borrowRenovation');
    
        const borrowId = table.foreignKeys.find(
          (fk) => fk.columnNames.indexOf('borrowId') !== -1
        );
        await queryRunner.dropForeignKey('borrowRenovation', borrowId);
      
        await queryRunner.dropTable('borrowRenovation');
      }
}
