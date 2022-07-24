import { LoginDto } from './login.dto';
import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class SignupDto extends LoginDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    retryPassword: string;
}