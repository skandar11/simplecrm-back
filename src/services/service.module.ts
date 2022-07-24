import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { AuthService } from './auth.service';
import { UserEntity } from 'src/DAL/entities/user.entity';
import { MainConfigModule } from 'src/infra/config/main-config.module';
import { MainConfigService } from './../infra/config/main-config.service';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [MainConfigModule],
            useFactory: (config: MainConfigService) => config.jwtOptions,
            inject: [MainConfigService]
        }),
        MikroOrmModule.forFeature({ entities: [UserEntity] })
    ],
    providers: [AuthService],
    exports: [AuthService],
})
export class ServiceModule { }