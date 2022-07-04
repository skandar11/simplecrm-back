import { SuccessAuthDto } from './dto/success-auth.dto';
import { UserRepository } from './repositories/user.repository';
import { LoginDto } from './dto/login.dto';
import { HttpStatus } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { Injectable } from '@nestjs/common';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/auth/repositories/user.entity';
import { UniHttpException } from '@unistory/nestjs-common';

@Injectable()
export class AuthService {
    constructor(
        private readonly _jwtService: JwtService,
        private readonly _userRepository: UserRepository
    ) { }

    async login(loginDto: LoginDto): Promise<SuccessAuthDto> {
        const { login, password } = loginDto;

        const user = await this._userRepository.findOne({ login });
        if (user == null) {
            throw new UniHttpException("Incorrect login or password", HttpStatus.BAD_REQUEST);
        }

        const passwordHash = await bcrypt.hash(password, user.salt);

        if (passwordHash != user.password) {
            throw new UniHttpException("Incorrect login or password", HttpStatus.BAD_REQUEST);
        }

        const payload = user.payload;
        const accessToken = this._jwtService.sign(payload);

        return { accessToken, refreshToken: "in future.." };
    }


    async signup(signupDto: SignupDto): Promise<void> {
        const { login, password, retryPassword } = signupDto;

        if (password != retryPassword) {
            throw new UniHttpException("Passwords do not match", HttpStatus.BAD_REQUEST);
        }

        const existsUser = await this._userRepository.findOne({ login });
        if (existsUser != null) {
            throw new UniHttpException("This login already use", HttpStatus.BAD_REQUEST);
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const user = new UserEntity(login, passwordHash, salt);
        await this._userRepository.persistAndFlush(user);
    }
}