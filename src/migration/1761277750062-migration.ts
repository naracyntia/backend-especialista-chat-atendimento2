import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1761277750062 implements MigrationInterface {
    name = 'Migration1761277750062'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "user_preferences" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "prefers_voice" boolean NOT NULL DEFAULT false, "preferred_name" character varying, "pronouns" character varying, "speech_language" character varying NOT NULL DEFAULT 'pt-BR', "speech_rate" double precision NOT NULL DEFAULT '1', "assistant_persona" character varying NOT NULL DEFAULT 'didatico', "consent_recorded" boolean NOT NULL DEFAULT false, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "REL_458057fa75b66e68a275647da2" UNIQUE ("user_id"), CONSTRAINT "PK_e8cfb5b31af61cd363a6b6d7c25" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN IF EXISTS "email"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN IF EXISTS "cpf"`);
        // Safely add required columns even when table has existing rows
        await queryRunner.query(`ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "surname" character varying`);
        await queryRunner.query(`UPDATE "user" SET "surname" = '' WHERE "surname" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "surname" SET NOT NULL`);

        await queryRunner.query(`ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "mail" character varying`);
        await queryRunner.query(`UPDATE "user" SET "mail" = '' WHERE "mail" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "mail" SET NOT NULL`);
        await queryRunner.query(`DO $$ BEGIN
          ALTER TABLE "user_preferences" ADD CONSTRAINT "FK_458057fa75b66e68a275647da2e" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
        EXCEPTION WHEN duplicate_object THEN NULL; END $$;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_preferences" DROP CONSTRAINT IF EXISTS "FK_458057fa75b66e68a275647da2e"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "mail"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "surname"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "cpf" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE IF EXISTS "user_preferences"`);
    }

}
