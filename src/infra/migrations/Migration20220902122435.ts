import { Migration } from '@mikro-orm/migrations';

export class Migration20220902122435 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "product" ("id" varchar(255) not null, "name" varchar(255) not null, "cost" int not null, "month_count" int not null, "training_count" int not null, "is_delete" boolean not null, "user_id" varchar(255) not null, constraint "product_pkey" primary key ("id"));');

    this.addSql('create table "subscription" ("id" varchar(255) not null, "status" smallint not null, "created_at" timestamptz(0) not null, "end_at" timestamptz(0) not null, "client_info_id" varchar(255) not null, "product_id" varchar(255) not null, constraint "subscription_pkey" primary key ("id"));');

    this.addSql('alter table "product" add constraint "product_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "subscription" add constraint "subscription_client_info_id_foreign" foreign key ("client_info_id") references "client_info" ("id") on update cascade;');
    this.addSql('alter table "subscription" add constraint "subscription_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "subscription" drop constraint "subscription_product_id_foreign";');

    this.addSql('drop table if exists "product" cascade;');

    this.addSql('drop table if exists "subscription" cascade;');
  }

}
