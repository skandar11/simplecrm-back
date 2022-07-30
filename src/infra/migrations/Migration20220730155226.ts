import { Migration } from '@mikro-orm/migrations';

export class Migration20220730155226 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "client_info" add column "update_at" timestamptz(0) not null, add column "created_at" timestamptz(0) not null;');
    this.addSql('alter table "client_info" drop column "about";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "client_info" add column "about" varchar(255) not null;');
    this.addSql('alter table "client_info" drop column "update_at";');
    this.addSql('alter table "client_info" drop column "created_at";');
  }

}
