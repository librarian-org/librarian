import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createTitleCategory1637777649127 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "titleCategory",
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

        await queryRunner.createForeignKey("titleCategory", new TableForeignKey({
            columnNames: ["titleId"],
            referencedColumnNames: ["id"],
            referencedTableName: "title",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("titleCategory", new TableForeignKey({
            columnNames: ["categoryId"],
            referencedColumnNames: ["id"],
            referencedTableName: "category",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("titleCategory");
        
        const categoryId = table.foreignKeys.find(fk => fk.columnNames.indexOf("categoryId") !== -1);
        await queryRunner.dropForeignKey("titleCategory", categoryId);
        
        const titleId = table.foreignKeys.find(fk => fk.columnNames.indexOf("titleId") !== -1);
        await queryRunner.dropForeignKey("titleCategory", titleId);

        await queryRunner.dropTable("titleCategory");
    }
}
