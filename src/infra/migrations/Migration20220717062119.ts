import { Migration } from '@mikro-orm/migrations';

export class Migration20220717062119 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "created_by" varchar(255) null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop column "created_by";');
  }

}
