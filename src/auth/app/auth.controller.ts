import { Body } from "@nestjs/common";

import { UniDecorators } from '@unistory/route-decorators';
import { AuthService } from 'src/auth/auth.service';

import { SignupDto } from '../dto/signup.dto';
import { SuccessAuthDto } from '../dto/success-auth.dto';
import { LoginDto } from '../dto/login.dto';

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
}