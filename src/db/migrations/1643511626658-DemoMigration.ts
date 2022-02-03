import {MigrationInterface, QueryRunner} from "typeorm";

export class DemoMigration1643511626658 implements MigrationInterface {
    name = 'DemoMigration1643511626658'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "demo_migration" ("id" SERIAL NOT NULL, "data" character varying NOT NULL, CONSTRAINT "PK_be1a247de5c7ca4d1088784a9bc" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "demo_migration"`);
    }

}
