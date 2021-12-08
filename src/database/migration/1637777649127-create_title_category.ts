import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createTitleCategory1637777649127 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "title_category",
            columns: [
                {
                    name: "id", 
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "titleId", 
                    type: "int",
                },
                {
                    name: "categoryId", 
                    type: "int",
                },
            ]
        }), true)

        await queryRunner.createForeignKey("title_category", new TableForeignKey({
            columnNames: ["titleId"],
            referencedColumnNames: ["id"],
            referencedTableName: "title",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("title_category", new TableForeignKey({
            columnNames: ["categoryId"],
            referencedColumnNames: ["id"],
            referencedTableName: "category",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("title_category");
        
        const categoryId = table.foreignKeys.find(fk => fk.columnNames.indexOf("categoryId") !== -1);
        await queryRunner.dropForeignKey("title_category", categoryId);
        
        const titleId = table.foreignKeys.find(fk => fk.columnNames.indexOf("titleId") !== -1);
        await queryRunner.dropForeignKey("title_category", titleId);

        await queryRunner.dropTable("title_category");
    }
}
