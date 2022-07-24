import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import * as bcrypt from "bcrypt";
import { UniHttpException } from '@unistory/nestjs-common';
import { v4 as uuid } from "uuid"

import { LoginDto } from '../dto/login.dto';
import { SignupDto } from '../dto/signup.dto';
import { SuccessAuthDto } from '../dto/success-auth.dto';
import { CreateClientDto } from '../dto/create-client.dto';

import { UserEntity } from 'src/DAL/entities/user.entity';
import { UserRepository } from '../DAL/repositories/user.repository';

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
            throw new UniHttpException("Incorrect login or password");
        }

        const passwordHash = await bcrypt.hash(password, user.salt);

        if (passwordHash != user.password) {
            throw new UniHttpException("Incorrect login or password");
        }

        const payload = user.payload;
        const accessToken = this._jwtService.sign(payload);

        return { accessToken, refreshToken: "in future.." };
    }

    async signup(signupDto: SignupDto): Promise<void> {
        const { login, password, retryPassword } = signupDto;

        if (password != retryPassword) {
            throw new UniHttpException("Passwords do not match");
        }

        const existsUser = await this._userRepository.findOne({ login });
        if (existsUser != null) {
            throw new UniHttpException("This login already use");
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const user = new UserEntity(login, passwordHash, salt);
        await this._userRepository.persistAndFlush(user);
    }

    async createClient(createClientDto: CreateClientDto, coachId: string): Promise<LoginDto> {
        const { login, name } = createClientDto;

        const existsUser = await this._userRepository.findOne({ login });
        if (existsUser != null) {
            throw new UniHttpException("This login already use");
        }
        // name must be send from event
        const tmpPassword = uuid();

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(tmpPassword, salt);

        const user = new UserEntity(login, passwordHash, salt, false)
        user.createdBy = coachId;
        await this._userRepository.persistAndFlush(user);
        return { login, password: tmpPassword };
    }
}