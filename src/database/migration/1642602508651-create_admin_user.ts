import { MigrationInterface, QueryRunner } from 'typeorm';

export default class createAdminUser1642602508651
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO user (id, name, login, password, userTypeId, language, document) values(1, 'Admin', 'admin', '$2a$12$.b6aV84dlgKRdS7wR6yLL.VLUIJU3e8op7WruVuLnOZZ7887wHIoW', 1, 'en', '0')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM user WHERE login = 'admin'`);

  }
}
