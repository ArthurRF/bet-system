import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDateControlColumns1738235894875
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users" 
      ADD COLUMN "created_at" TIMESTAMP DEFAULT NOW(),
      ADD COLUMN "updated_at" TIMESTAMP DEFAULT NOW()
    `);

    await queryRunner.query(`
      ALTER TABLE "sport_event" 
      ADD COLUMN "created_at" TIMESTAMP DEFAULT NOW(),
      ADD COLUMN "updated_at" TIMESTAMP DEFAULT NOW()
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users" 
      DROP COLUMN IF EXISTS "created_at",
      DROP COLUMN IF EXISTS "updated_at"
    `);

    await queryRunner.query(`
      ALTER TABLE "sport_event" 
      DROP COLUMN IF EXISTS "created_at",
      DROP COLUMN IF EXISTS "updated_at"
    `);
  }
}
