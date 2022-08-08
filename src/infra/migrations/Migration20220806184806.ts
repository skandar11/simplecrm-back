import { Migration } from '@mikro-orm/migrations';

export class Migration20220806184806 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "client_info" add column "status" smallint not null default 1;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "client_info" drop column "status";');
  }

}
