import { Entity, Enum, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';

import { v4 as uuid } from "uuid";

import { ProductEntity } from './product.entity';
import { ClientInfoEntity } from './client-info.entity';

import { SubscriptionStatusEnum } from './../../infra/enums/subscription-status.enum';
import { SubscriptionRepository } from '../repositories/subscription.repository';

@Entity({ tableName: "subscription", customRepository: () => SubscriptionRepository })
export class SubscriptionEntity {
    @PrimaryKey()
    id: string;

    @Enum(() => SubscriptionStatusEnum)
    status: SubscriptionStatusEnum;

    @Property()
    createdAt: Date;

    @Property()
    endAt: Date;

    @ManyToOne(() => ClientInfoEntity)
    clientInfo: ClientInfoEntity;

    @ManyToOne(() => ProductEntity)
    product: ProductEntity;

    constructor(endAt: Date) {
        this.createdAt = new Date();
        this.endAt = endAt;

        this.id = uuid();
        this.status = SubscriptionStatusEnum.WaitingForPayment;
    }

    public setProduct(product: ProductEntity) {
        this.product = product;
    }

    public setClientInfo(clientInfo: ClientInfoEntity) {
        this.clientInfo = clientInfo;
    }

    public setActiveStatus() {
        if (!this.checkFieldsOnCompleteness) {
            throw new Error("All fields must be completeness");
        }

        this.status = SubscriptionStatusEnum.Active;
    }

    private checkFieldsOnCompleteness(): boolean {
        if (this.product == null || this.clientInfo == null) {
            return false;
        }
        return true;
    }
}