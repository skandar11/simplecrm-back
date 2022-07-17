import { Migration } from '@mikro-orm/migrations';

export class Migration20220717062650 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" alter column "role" type smallint using ("role"::smallint);');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop constraint if exists "user_role_check";');

    this.addSql('alter table "user" alter column "role" type jsonb using ("role"::jsonb);');
  }

}
