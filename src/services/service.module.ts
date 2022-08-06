import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { AuthService } from './auth.service';
import { TargetService } from './target.service';
import { ClientInfoService } from './client-info.service';
import { MainConfigService } from './../infra/config/main-config.service';

import { UserEntity } from 'src/DAL/entities/user.entity';
import { TargetEntity } from './../DAL/entities/target.entity';
import { ClientInfoEntity } from './../DAL/entities/client-info.entity';
import { MainConfigModule } from 'src/infra/config/main-config.module';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [MainConfigModule],
            useFactory: (config: MainConfigService) => config.jwtOptions,
            inject: [MainConfigService]
        }),
        MikroOrmModule.forFeature({ entities: [UserEntity, ClientInfoEntity, TargetEntity] })
    ],
    providers: [AuthService, ClientInfoService, TargetService],
    exports: [AuthService, ClientInfoService, TargetService],
})
export class ServiceModule { }