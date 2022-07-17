import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateClientDto {
    @ApiProperty()
    @IsPhoneNumber()
    @IsNotEmpty()
    login: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;
}