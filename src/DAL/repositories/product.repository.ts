import { EntityRepository } from "@mikro-orm/core";

import { ProductEntity } from "../entities/product.entity";

export class ProductRepository extends EntityRepository<ProductEntity> {
    public async getAllUserProducts(id: string): Promise<ProductEntity[]> {
        return await this.find({ user: { id } });
    }
}