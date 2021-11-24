import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createProfile1637764255535 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "profile",
            columns: [
                {
                    name: "id", 
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "varchar",
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("profile");
    }

}
