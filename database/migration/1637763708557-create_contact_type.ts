import { MigrationInterface, QueryRunner } from 'typeorm';
import { TablePatch } from '../TablePatch';

export class createContactType1637763708557 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new TablePatch({
        name: 'contact_type',
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
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('contact_type');
  }
}
