import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createTitlePublisher1637783255671 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "title_publisher",
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
                    name: "title_id", 
                    type: "int",
                },
                {
                    name: "publisher_id", 
                    type: "int",
                },

            ]
        }), true)

        await queryRunner.createForeignKey("title_publisher", new TableForeignKey({
            columnNames: ["title_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "title",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("title_publisher", new TableForeignKey({
            columnNames: ["publisher_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "publisher",
            onDelete: "CASCADE"
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("title_publisher");

        const titleId = table.foreignKeys.find(fk => fk.columnNames.indexOf("title_id") !== -1);
        await queryRunner.dropForeignKey("title_publisher", titleId);

        const publisherId = table.foreignKeys.find(fk => fk.columnNames.indexOf("publisher_id") !== -1);
        await queryRunner.dropForeignKey("title_publisher", publisherId);

        await queryRunner.dropTable("title_publisher");
    }
}
