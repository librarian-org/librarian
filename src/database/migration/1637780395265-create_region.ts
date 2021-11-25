import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createRegion1637780395265 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "region",
            columns: [
                {
                    name: "id", 
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: "country_id", 
                    type: "int",
                },

            ]
        }), true)

        await queryRunner.createForeignKey("region", new TableForeignKey({
            columnNames: ["country_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "country",
            onDelete: "CASCADE"
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("region");

        const countryID = table.foreignKeys.find(fk => fk.columnNames.indexOf("country_id") !== -1);
        await queryRunner.dropForeignKey("region", countryID);

        await queryRunner.dropTable("region");
    }

}
