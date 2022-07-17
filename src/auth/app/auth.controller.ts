import { CreateClientDto } from './../dto/create-client.dto';
import { UserPayloadModel } from './../models/user-payload.model';
import { RolesGuard } from './../../infra/guards/roles.guard';
import { Body, UseGuards } from "@nestjs/common";

import { UniDecorators } from '@unistory/route-decorators';
import { AuthService } from 'src/auth/auth.service';

import { SignupDto } from '../dto/signup.dto';
import { SuccessAuthDto } from '../dto/success-auth.dto';
import { LoginDto } from '../dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/infra/guards/roles.decorator';
import { UserRoleEnum } from '../user-role.enum';
import { getUser } from 'src/infra/guards/get-user.decorator';

@UniDecorators.Controller("auth")
export class AuthController {
    constructor(private readonly _authService: AuthService) { }

    @UniDecorators.Post("signup", "signup")
    signup(@Body() signupDto: SignupDto): Promise<void> {
        return this._authService.signup(signupDto);
    }

    @UniDecorators.Post("login", "login")
    login(@Body() loginDto: LoginDto): Promise<SuccessAuthDto> {
        return this._authService.login(loginDto);
    }

    @UniDecorators.Post("create-client", "create client by couch", false, SuccessAuthDto)
    @UseGuards(AuthGuard(), RolesGuard)
    @Roles(UserRoleEnum.Coach)
    createClient(@getUser() user: UserPayloadModel, @Body() createClientDto: CreateClientDto) {
        return this._authService.createClient(createClientDto, user.id);
    }
}