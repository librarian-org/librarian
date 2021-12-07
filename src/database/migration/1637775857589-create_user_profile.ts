import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createUserProfile1637775857589 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "userProfile",
            columns: [
                {
                    name: "id", 
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "userId", 
                    type: "int",
                },
                {
                    name: "profileId", 
                    type: "int",
                },
            ]
        }), true)

        await queryRunner.createForeignKey("userProfile", new TableForeignKey({
            columnNames: ["userId"],
            referencedColumnNames: ["id"],
            referencedTableName: "user",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("userProfile", new TableForeignKey({
            columnNames: ["profileId"],
            referencedColumnNames: ["id"],
            referencedTableName: "profile",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("userProfile");
        
        const profileId = table.foreignKeys.find(fk => fk.columnNames.indexOf("profileId") !== -1);
        await queryRunner.dropForeignKey("userProfile", profileId);
        
        const userId = table.foreignKeys.find(fk => fk.columnNames.indexOf("userId") !== -1);
        await queryRunner.dropForeignKey("userProfile", userId);

        await queryRunner.dropTable("userProfile");
    }
}
