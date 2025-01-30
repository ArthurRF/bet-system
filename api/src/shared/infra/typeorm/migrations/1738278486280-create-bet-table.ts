import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBetTable1738278486280 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
				CREATE TABLE IF NOT EXISTS bet (
					bet_id SERIAL PRIMARY KEY,
					user_id UUID NOT NULL,
					event_id INTEGER NOT NULL,
					value FLOAT NOT NULL,
					created_at TIMESTAMP DEFAULT NOW(),
					updated_at TIMESTAMP DEFAULT NOW(),
					FOREIGN KEY (user_id) REFERENCES users(user_id),
					FOREIGN KEY (event_id) REFERENCES sport_event(event_id)
				)
			`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
			DROP TABLE IF EXISTS bet
		`);
  }
}
