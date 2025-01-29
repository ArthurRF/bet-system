import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSportEventTable1738099878773 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
			CREATE TABLE IF NOT EXISTS sport_event (
				event_id SERIAL PRIMARY KEY,
				event_name VARCHAR(255) NOT NULL,
				odds FLOAT NOT NULL
			)
		`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
			DROP TABLE IF EXISTS sport_event
		`);
  }
}
