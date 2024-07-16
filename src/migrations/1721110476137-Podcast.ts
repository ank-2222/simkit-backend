import { MigrationInterface, QueryRunner ,Table} from "typeorm";

export class Podcast1721110476137 implements MigrationInterface {
  name?: "Podcast1721110476137";
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'podcast',
              columns: [
                {
                  name: 'id',
                  type: 'varchar',
                  isPrimary: true,
                  isNullable: false,
                },
                {
                  name: 'title',
                  type: 'text',
                  isNullable: false,
                },
                {
                  name: 'description',
                  type: 'text',
                  isNullable: false,
                },
                {
                  name: 'image_url',
                  type: 'text',
                  isNullable: false,
                },
                {
                  name: 'audio_file',
                  type: 'text',
                  isNullable: false,
                },
                {
                  name: 'subtitle',
                  type: 'text',
                  isNullable: true,
                },
                {
                  name: 'created_at',
                  type: 'timestamptz',
                  isNullable: false,
                  default: 'now()',
                },
                {
                  name: 'updated_at',
                  type: 'timestamptz',
                  isNullable: false,
                  default: 'now()',
                },
              ],
            }),
            true,
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('podcast');
    }

}
