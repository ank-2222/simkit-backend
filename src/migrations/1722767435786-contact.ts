import { MigrationInterface, QueryRunner,Table  } from "typeorm";

export class Contact1722767435786 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: "contact",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true,
                    isNullable: false,
                  },
              {
                name: "name",
                type: "varchar",
                length: "255",
              },
              {
                name: "email",
                type: "varchar",
                length: "255",
              },
              {
                name: "phone",
                type: "varchar",
                length: "20",
              },
              {
                name: "message",
                type: "text",
              },
              {
                name: "type",
                type: "varchar",
                length: "255",
              },
              {
                name: "created_at",
                type: "timestamp",
                default: "now()",
              },
              {
                name: "updated_at",
                type: "timestamp",
                default: "now()",
              },
            ],
          })
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("contact");
      }

}
