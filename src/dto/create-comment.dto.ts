import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCommentDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    text?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    destinationId: string;
}