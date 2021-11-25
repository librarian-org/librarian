import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createSettings1637762838040 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "settings",
            columns: [
                {
                    name: "days_return_date", 
                    type: "int",
                },
                {
                    name: "backup_path",
                    type: "varchar",
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("settings");
    }

}