import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createUser1637774086085 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "user",
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
                    name: "login",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "password",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "language",
                    type: "varchar",
                },
                {
                    name: "notes",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "document",
                    type: "varchar",
                },
                {
                    name: "user_type_id",
                    type: "int",
                },
            ]
        }), true)

        await queryRunner.createForeignKey("user", new TableForeignKey({
            columnNames: ["user_type_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "user_type",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("user");

        const userTypeId = table.foreignKeys.find(fk => fk.columnNames.indexOf("user_type_id") !== -1);
        await queryRunner.dropForeignKey("user", userTypeId);

        await queryRunner.dropTable("user");
    }

}
