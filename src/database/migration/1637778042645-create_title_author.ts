import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createTitleAuthor1637778042645 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "titleAuthor",
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
                    name: "authorId", 
                    type: "int",
                },
            ]
        }), true)

        await queryRunner.createForeignKey("titleAuthor", new TableForeignKey({
            columnNames: ["titleId"],
            referencedColumnNames: ["id"],
            referencedTableName: "title",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("titleAuthor", new TableForeignKey({
            columnNames: ["authorId"],
            referencedColumnNames: ["id"],
            referencedTableName: "category",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("titleAuthor");

        const categoryId = table.foreignKeys.find(fk => fk.columnNames.indexOf("authorId") !== -1);
        await queryRunner.dropForeignKey("titleAuthor", categoryId);

        const titleId = table.foreignKeys.find(fk => fk.columnNames.indexOf("titleId") !== -1);
        await queryRunner.dropForeignKey("titleAuthor", titleId);

        await queryRunner.dropTable("titleAuthor");
    }
}
