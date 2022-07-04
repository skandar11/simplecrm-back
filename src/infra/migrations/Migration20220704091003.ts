import { Migration } from '@mikro-orm/migrations';

export class Migration20220704091003 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" varchar(255) not null, "login" varchar(255) not null, "password" varchar(255) not null, "salt" varchar(255) not null, "created_at" timestamptz(0) not null);');
    this.addSql('alter table "user" add constraint "user_login_unique" unique ("login");');
    this.addSql('alter table "user" add constraint "user_pkey" primary key ("id");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "user" cascade;');
  }

}
