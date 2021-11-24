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
                    name: "title_id", 
                    type: "int",
                },
                {
                    name: "category_id", 
                    type: "int",
                },
            ]
        }), true)

        await queryRunner.createForeignKey("title_category", new TableForeignKey({
            columnNames: ["title_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "title",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("title_category", new TableForeignKey({
            columnNames: ["category_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "category",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("title_category");
        
        const categoryId = table.foreignKeys.find(fk => fk.columnNames.indexOf("category_id") !== -1);
        await queryRunner.dropForeignKey("title_category", categoryId);
        
        const titleId = table.foreignKeys.find(fk => fk.columnNames.indexOf("title_id") !== -1);
        await queryRunner.dropForeignKey("title_category", titleId);

        await queryRunner.dropTable("title_category");
    }
}
