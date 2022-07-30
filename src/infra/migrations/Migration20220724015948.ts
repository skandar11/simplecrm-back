import { Migration } from '@mikro-orm/migrations';

export class Migration20220724015948 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "client_info" ("id" varchar(255) not null, "phone_number" varchar(255) not null, "name" varchar(255) not null, "email" varchar(255) not null, "birth_day" timestamptz(0) not null, "about" varchar(255) not null, "contraindications" varchar(255) not null);');
    this.addSql('alter table "client_info" add constraint "client_info_pkey" primary key ("id");');

    this.addSql('alter table "user" add column "client_info_id" varchar(255) null;');
    this.addSql('alter table "user" add constraint "user_client_info_id_foreign" foreign key ("client_info_id") references "client_info" ("id") on update cascade on delete set null;');
    this.addSql('alter table "user" add constraint "user_client_info_id_unique" unique ("client_info_id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop constraint "user_client_info_id_foreign";');

    this.addSql('drop table if exists "client_info" cascade;');

    this.addSql('alter table "user" drop constraint "user_client_info_id_unique";');
    this.addSql('alter table "user" drop column "client_info_id";');
  }

}
