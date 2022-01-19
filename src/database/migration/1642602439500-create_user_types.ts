import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUserTypes1642602439500 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO user_type (id, name) values(1, 'admin')`
    );
    await queryRunner.query(
      `INSERT INTO user_type (id, name) values(2, 'librarian')`
    );
    await queryRunner.query(
      `INSERT INTO user_type (id, name) values(3, 'person')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM user_type WHERE id = 3`);
    await queryRunner.query(`DELETE FROM user_type WHERE id = 2`);
    await queryRunner.query(`DELETE FROM user_type WHERE id = 1`);
  }
}
