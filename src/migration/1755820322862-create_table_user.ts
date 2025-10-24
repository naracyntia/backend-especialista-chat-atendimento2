import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUser1755820322862 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS public."user"(
                id INTEGER NOT NULL,
                name CHARACTER VARYING NOT NULL,
                surname CHARACTER VARYING NOT NULL,
                mail CHARACTER VARYING NOT NULL,
                phone CHARACTER VARYING NOT NULL,
                password CHARACTER VARYING NOT NULL,
                created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
                updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
                PRIMARY KEY (id)
            );

            CREATE SEQUENCE IF NOT EXISTS public.user_id_seq
                As INTEGER
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;

            ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


            ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass)
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS public."user";`);
        await queryRunner.query(`DROP SEQUENCE IF EXISTS public.user_id_seq`);
    }
}

export class AddUniqueEmailUser1755820322862 implements MigrationInterface {
    name = 'AddUniqueEmailUser1755820322862'
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DO $$
        BEGIN
          IF EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_schema = 'public' 
              AND table_name = 'user' 
              AND column_name = 'mail'
          ) THEN
            CREATE UNIQUE INDEX IF NOT EXISTS "IDX_user_mail" ON public."user"(mail);
          END IF;
        END $$;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_user_mail"`);
    }
}
