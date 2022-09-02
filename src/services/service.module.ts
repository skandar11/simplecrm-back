import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { MainConfigModule } from 'src/infra/config/main-config.module';

import { AuthService } from './auth.service';
import { MapperService } from './mapper.service';
import { TargetService } from './target.service';
import { CommentService } from './comment.service';
import { ClientInfoService } from './client-info.service';
import { ProductService } from './product.service';
import { MainConfigService } from './../infra/config/main-config.service';

import { UserEntity } from 'src/DAL/entities/user.entity';
import { TargetEntity } from './../DAL/entities/target.entity';
import { ClientInfoEntity } from './../DAL/entities/client-info.entity';
import { CommentEntity } from 'src/DAL/entities/comment.entity';
import { SubscriptionEntity } from './../DAL/entities/subscription.entity';
import { ProductEntity } from './../DAL/entities/product.entity';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [MainConfigModule],
            useFactory: (config: MainConfigService) => config.jwtOptions,
            inject: [MainConfigService]
        }),
        MikroOrmModule.forFeature({ entities: [UserEntity, ClientInfoEntity, TargetEntity, CommentEntity, ProductEntity, SubscriptionEntity] }),
        AutomapperModule.forRoot({
            strategyInitializer: classes()
        })
    ],
    providers: [AuthService, ClientInfoService, TargetService, CommentService, MapperService, ProductService],
    exports: [AuthService, ClientInfoService, TargetService, CommentService, ProductService],
})
export class ServiceModule { }