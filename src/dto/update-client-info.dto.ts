import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class UpdateClientInfoDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty()
    @IsPhoneNumber()
    @IsOptional()
    phoneNumber?: string;

    @ApiProperty()
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiProperty()
    @IsDateString()
    @IsOptional()
    birthDay?: Date;

    @ApiProperty()
    @IsString()
    @IsOptional()
    contraindications?: string;
}