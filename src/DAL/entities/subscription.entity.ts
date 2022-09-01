import { Entity } from '@mikro-orm/core';

@Entity({ tableName: "subscription" })
export class SubscriptionEntity {
    id: string;
}