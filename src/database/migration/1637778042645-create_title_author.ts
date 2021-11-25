import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createTitleAuthor1637778042645 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "title_author",
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
                    name: "author_id", 
                    type: "int",
                },
            ]
        }), true)

        await queryRunner.createForeignKey("title_author", new TableForeignKey({
            columnNames: ["title_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "title",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("title_author", new TableForeignKey({
            columnNames: ["author_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "category",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("title_author");

        const categoryId = table.foreignKeys.find(fk => fk.columnNames.indexOf("author_id") !== -1);
        await queryRunner.dropForeignKey("title_author", categoryId);

        const titleId = table.foreignKeys.find(fk => fk.columnNames.indexOf("title_id") !== -1);
        await queryRunner.dropForeignKey("title_author", titleId);

        await queryRunner.dropTable("title_author");
    }
}
