import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SetTargetDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    desire: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    clientInfoId: string;
}