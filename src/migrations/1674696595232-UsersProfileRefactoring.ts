import { MigrationInterface, QueryRunner } from 'typeorm';

export class UsersProfileRefactoring1674696595232 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE user_profile CHANGE user_type_code user_type varchar(10) NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE user_profile CHANGE user_type user_type_code varchar(2) NOT NULL`
    );
  }
}
