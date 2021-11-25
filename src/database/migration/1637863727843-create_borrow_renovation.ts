import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createBorrowRenovation1637863727843 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'borrow_renovation',
            columns: [
              {
                name: 'id',
                type: 'int',
                isPrimary: true,
              },
              {
                name: 'borrowed_at',
                type: 'varchar',
              },
              {
                name: 'renewed_at',
                type: 'varchar',
              },
              {
                name: 'returned_at',
                type: 'varchar',
              },
              {
                name: 'borrow_id',
                type: 'int',
              },
            ],
          }),
          true
        );
    
        await queryRunner.createForeignKey(
          'borrow_renovation',
          new TableForeignKey({
            columnNames: ['borrow_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'borrow',
            onDelete: 'CASCADE',
          })
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('borrow_renovation');
    
        const borrowId = table.foreignKeys.find(
          (fk) => fk.columnNames.indexOf('borrow_id') !== -1
        );
        await queryRunner.dropForeignKey('borrow_renovation', borrowId);
      
        await queryRunner.dropTable('borrow_renovation');
      }
}
