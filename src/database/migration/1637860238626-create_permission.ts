import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createPermission1637860238626 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
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
                name: 'program_id',
                type: 'int',
              },
              {
                name: 'profile_id',
                type: 'int',
              },
            ],
          }),
          true
        );
    
        await queryRunner.createForeignKey(
          'permission',
          new TableForeignKey({
            columnNames: ['program_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'program',
            onDelete: 'CASCADE',
          })
        );
    
        await queryRunner.createForeignKey(
          'permission',
          new TableForeignKey({
            columnNames: ['profile_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'profile',
            onDelete: 'CASCADE',
          })
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('permission');
    
        const profileId = table.foreignKeys.find(
          (fk) => fk.columnNames.indexOf('profile_id') !== -1
        );
        await queryRunner.dropForeignKey('permission', profileId);
    
        const programId = table.foreignKeys.find(
          (fk) => fk.columnNames.indexOf('program_id') !== -1
        );
        await queryRunner.dropForeignKey('permission', programId);
    
        await queryRunner.dropTable('permission');
      }
}
