import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDateString, IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class SetClientInfoDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsPhoneNumber()
    @IsNotEmpty()
    phoneNumber: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    birthDay: Date;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    about: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    contraindications: string;
}