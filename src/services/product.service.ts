import { Injectable } from "@nestjs/common";

import type { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';

import { ProductRepository } from './../DAL/repositories/product.repository';
import { UserRepository } from 'src/DAL/repositories/user.repository';
import { ProductEntity } from './../DAL/entities/product.entity';

import { ProductDto } from './../dto/product.dto';
import { CreateProductDto } from './../dto/create-product.dto';
import { NewRecordDto } from 'src/dto/new-record.dto';

@Injectable()
export class ProductService {
    constructor(
        private readonly _productRepository: ProductRepository,
        private readonly _userRepository: UserRepository,
        @InjectMapper()
        private readonly _mapper: Mapper
    ) { }

    public async create(userId: string, createProductDto: CreateProductDto): Promise<NewRecordDto> {
        const { name, cost, monthCount, trainingCount } = createProductDto;

        const product = new ProductEntity(name, cost, monthCount, trainingCount);
        const user = await this._userRepository.findOne({ id: userId });

        product.setUser(user);
        await this._productRepository.persistAndFlush(product);

        return { id: product.id };
    }

    public async getAll(userId: string): Promise<ProductDto[]> {
        const products = await this._productRepository.getAllUserProducts(userId);

        return this._mapper.mapArray(products, ProductEntity, ProductDto);
    }
}