import { Body, UseGuards } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';

import { UniDecorators } from '@unistory/route-decorators';
import { AuthService } from 'src/services/auth.service';

import { SignupDto } from '../dto/signup.dto';
import { SuccessAuthDto } from '../dto/success-auth.dto';
import { CreateClientDto } from '../dto/create-client.dto';
import { LoginDto } from '../dto/login.dto';

import { RolesGuard } from '../infra/guards/roles.guard';
import { Roles } from 'src/infra/guards/roles.decorator';
import { UserRoleEnum } from '../infra/enums/user-role.enum';
import { getUser } from 'src/infra/guards/get-user.decorator';
import { UserPayloadModel } from '../models/user-payload.model';

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

    @UniDecorators.Post("create-client", "create client by couch", false, LoginDto)
    @UseGuards(AuthGuard(), RolesGuard)
    @Roles(UserRoleEnum.Coach)
    createClient(@getUser() user: UserPayloadModel, @Body() createClientDto: CreateClientDto) {
        return this._authService.createClient(createClientDto, user.id);
    }
}