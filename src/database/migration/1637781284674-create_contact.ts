import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createContact1637781284674 implements MigrationInterface {

 
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "contact",
            columns: [
                {
                    name: "id", 
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "info",
                    type: "varchar",
                },
                {
                    name: "contact_type_id", 
                    type: "int",
                },
                {
                    name: "user_id", 
                    type: "int",
                },

            ]
        }), true)

        await queryRunner.createForeignKey("contact", new TableForeignKey({
            columnNames: ["contact_type_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "contact_type",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("contact", new TableForeignKey({
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "user",
            onDelete: "CASCADE"
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("contact");

        const contactTypeId = table.foreignKeys.find(fk => fk.columnNames.indexOf("contact_type_id") !== -1);
        await queryRunner.dropForeignKey("contact", contactTypeId);

        const userId = table.foreignKeys.find(fk => fk.columnNames.indexOf("user_id") !== -1);
        await queryRunner.dropForeignKey("contact", userId);

        await queryRunner.dropTable("contact");
    }

}
