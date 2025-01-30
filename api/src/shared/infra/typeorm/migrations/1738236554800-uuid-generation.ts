import { MigrationInterface, QueryRunner } from 'typeorm';

export class UuidGeneration1738236554800 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
			CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
		`);
    await queryRunner.query(`
				ALTER TABLE "users" 
				ALTER COLUMN "user_id" SET DEFAULT uuid_generate_v4()
			`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
				ALTER TABLE "users" 
				ALTER COLUMN "user_id" DROP DEFAULT
			`);
    await queryRunner.query(`
				DROP EXTENSION IF EXISTS "uuid-ossp";
			`);
  }
}
