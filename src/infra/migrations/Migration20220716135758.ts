import { Migration } from '@mikro-orm/migrations';

export class Migration20220716135758 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "role" jsonb not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop column "role";');
  }

}
