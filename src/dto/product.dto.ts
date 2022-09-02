import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class ProductDto {
    @ApiProperty()
    @AutoMap()
    id: string;

    @ApiProperty()
    @AutoMap()
    name: string;

    @ApiProperty()
    @AutoMap()
    cost: number;

    @ApiProperty()
    @AutoMap()
    monthCount: number;

    @ApiProperty()
    @AutoMap()
    trainingCount: number;
}