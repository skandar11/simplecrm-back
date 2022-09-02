import { Migration } from '@mikro-orm/migrations';

export class Migration20220825174128 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "comment" ("id" varchar(255) not null, "content" varchar(255) not null, "comment_type" smallint not null, "created_at" timestamptz(0) not null, "target_id" varchar(255) not null, constraint "comment_pkey" primary key ("id"));');

    this.addSql('alter table "comment" add constraint "comment_target_id_foreign" foreign key ("target_id") references "target" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "comment" cascade;');
  }

}
