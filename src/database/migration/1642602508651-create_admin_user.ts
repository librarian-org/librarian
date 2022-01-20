import { MigrationInterface, QueryRunner } from 'typeorm';

export default class createAdminUser1642602508651
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('user')
      .values({
        id: 1,
        name: 'Admin',
        login: 'admin',
        password:
          '$2a$12$.b6aV84dlgKRdS7wR6yLL.VLUIJU3e8op7WruVuLnOZZ7887wHIoW',
        userTypeId: 1,
        language: 'en',
        document: '0',
      })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('user')
      .where({ id: 1 })
      .execute();
  }
}
