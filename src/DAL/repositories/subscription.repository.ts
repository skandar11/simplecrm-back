import { EntityRepository } from "@mikro-orm/core";

import { SubscriptionEntity } from './../entities/subscription.entity';

export class SubscriptionRepository extends EntityRepository<SubscriptionEntity>{ }