import { ApiProperty } from '@nestjs/swagger';

import { IsPhoneNumber, IsString } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
    @ApiProperty()
    @IsPhoneNumber()
    @IsNotEmpty()
    login: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;
}