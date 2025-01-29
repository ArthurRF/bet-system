import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMockSportsEvents1738100978618 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
			INSERT INTO sport_event (event_name, odds)
			VALUES
				('Soccer: Team A vs. Team B', 1.75),
				('Soccer: Team C vs. Team D', 1.5),
				('Soccer: Team E vs. Team F', 1.8),
				('Volleyball: Team G vs. Team H', 2.1),
				('Basketball: Team I vs. Team J', 1.9)
		`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // do nothing
  }
}
