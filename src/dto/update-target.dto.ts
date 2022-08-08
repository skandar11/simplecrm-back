import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { TargetStatus } from "src/infra/enums/target-status.enum";

export class UpdateTargetDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    desire?: string;

    @ApiProperty()
    @IsOptional()
    @IsEnum(TargetStatus)
    status?: TargetStatus;
}