import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateProductDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    cost: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    monthCount: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    trainingCount: number;
}