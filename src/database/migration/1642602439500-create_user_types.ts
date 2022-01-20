import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUserTypes1642602439500 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('user_type')
      .values([
        {
          id: 1,
          name: 'admin',
        },
        {
          id: 2,
          name: 'librarian',
        },
        {
          id: 3,
          name: 'person',
        },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('user_type')
      .where([{ id: 1 }, { id: 2 }, { id: 3 }])
      .execute();
  }
}
