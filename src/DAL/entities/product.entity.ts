import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuid } from "uuid";

@Entity({ tableName: "product" })
export class ProductEntity {
    @PrimaryKey()
    id: string;

    @Property()
    name: string;

    @Property()
    cost: number;

    @Property()
    monthCount: number;

    @Property()
    trainingCount: number;

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
    }
}