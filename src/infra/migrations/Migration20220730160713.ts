import { Migration } from '@mikro-orm/migrations';

export class Migration20220730160713 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "target" ("id" varchar(255) not null, "desire" varchar(255) not null, "status" smallint not null, "created_at" timestamptz(0) not null, "client_info_id" varchar(255) not null);');
    this.addSql('alter table "target" add constraint "target_pkey" primary key ("id");');

    this.addSql('alter table "target" add constraint "target_client_info_id_foreign" foreign key ("client_info_id") references "client_info" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "target" cascade;');
  }

}
