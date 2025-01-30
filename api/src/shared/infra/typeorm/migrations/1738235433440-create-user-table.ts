import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1738235433440 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS users (
          user_id UUID PRIMARY KEY,
          username VARCHAR(255) NOT NULL,
          password TEXT NOT NULL
        )
			`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS users
		`);
  }
}
