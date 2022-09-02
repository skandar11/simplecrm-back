import { Cascade, Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';

import { v4 as uuid } from "uuid";
import { AutoMap } from '@automapper/classes';

import { SubscriptionEntity } from './subscription.entity';
import { ProductRepository } from '../repositories/product.repository';
import { UserEntity } from './../../DAL/entities/user.entity';

@Entity({ tableName: "product", customRepository: () => ProductRepository })
export class ProductEntity {
    @AutoMap()
    @PrimaryKey()
    id: string;

    @AutoMap()
    @Property()
    name: string;

    @AutoMap()
    @Property()
    cost: number;

    @AutoMap()
    @Property()
    monthCount: number;

    @AutoMap()
    @Property()
    trainingCount: number;

    @Property()
    isDelete: boolean;

    @OneToMany(() => SubscriptionEntity, sub => sub.product, { cascade: [Cascade.ALL] })
    subscriptions = new Collection<SubscriptionEntity>(this);

    @ManyToOne(() => UserEntity)
    user: UserEntity;

    constructor(name: string, cost: number, monthCount: number, trainingCount: number) {
        if (cost < 0) {
            throw new Error("Incorrect value for cost");
        }

        if (monthCount < 0) {
            throw new Error("Incorrect value for month");
        }

        if (trainingCount < 0) {
            throw new Error("Incorrect value for training");
        }

        this.name = name;
        this.cost = cost;
        this.monthCount = monthCount;
        this.trainingCount = trainingCount;

        this.id = uuid();
        this.isDelete = false;
    }

    public setUser(user: UserEntity) {
        this.user = user;
    }
}