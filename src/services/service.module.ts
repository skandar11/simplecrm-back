import { MapperService } from './mapper.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { AuthService } from './auth.service';
import { TargetService } from './target.service';
import { CommentService } from './comment.service';
import { ClientInfoService } from './client-info.service';
import { MainConfigService } from './../infra/config/main-config.service';

import { UserEntity } from 'src/DAL/entities/user.entity';
import { TargetEntity } from './../DAL/entities/target.entity';
import { ClientInfoEntity } from './../DAL/entities/client-info.entity';
import { MainConfigModule } from 'src/infra/config/main-config.module';
import { CommentEntity } from 'src/DAL/entities/comment.entity';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [MainConfigModule],
            useFactory: (config: MainConfigService) => config.jwtOptions,
            inject: [MainConfigService]
        }),
        MikroOrmModule.forFeature({ entities: [UserEntity, ClientInfoEntity, TargetEntity, CommentEntity] }),
        AutomapperModule.forRoot({
            strategyInitializer: classes()
        })
    ],
    providers: [AuthService, ClientInfoService, TargetService, CommentService, MapperService],
    exports: [AuthService, ClientInfoService, TargetService, CommentService],
})
export class ServiceModule { }