import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MainConfigService } from 'src/infra/config/main-config.service';
import { MainConfigModule } from 'src/infra/config/main-config.module';

import { AuthService } from 'src/auth/auth.service';
import { AuthController } from './auth.controller';

import { UserEntity } from '../repositories/user.entity';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [MainConfigModule],
            useFactory: (config: MainConfigService) => config.jwtOptions,
            inject: [MainConfigService]
        }),
        MikroOrmModule.forFeature({ entities: [UserEntity] })],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule { }