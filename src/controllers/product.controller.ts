import { Body, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { getUser } from 'src/infra/guards/get-user.decorator';
import { ProductService } from './../services/product.service';

import { UniDecorators } from "@unistory/route-decorators";
import { UserRoleEnum } from "src/infra/enums/user-role.enum";
import { Roles } from "src/infra/guards/roles.decorator";
import { RolesGuard } from "src/infra/guards/roles.guard";

import { NewRecordDto } from './../dto/new-record.dto';
import { UserPayloadModel } from 'src/models/user-payload.model';
import { ProductDto } from './../dto/product.dto';
import { CreateProductDto } from './../dto/create-product.dto';

@UniDecorators.Controller("products")
@UseGuards(AuthGuard(), RolesGuard)
@Roles(UserRoleEnum.Coach)
export class ProductController {
    constructor(private readonly _productService: ProductService) { }

    @UniDecorators.Post("", "Create product", false, NewRecordDto)
    public create(@Body() createProductDto: CreateProductDto, @getUser() payload: UserPayloadModel): Promise<NewRecordDto> {
        return this._productService.create(payload.id, createProductDto);
    }

    @UniDecorators.Get("", "Get all user products", true, ProductDto)
    public getAll(@getUser() payload: UserPayloadModel): Promise<ProductDto[]> {
        return this._productService.getAll(payload.id);
    }
}

