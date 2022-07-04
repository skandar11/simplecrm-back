import { AuthModule } from './auth/app/auth.module';
import { Module } from "@nestjs/common";

import { MikroOrmModule } from "@mikro-orm/nestjs"

import { MainConfigModule } from './infra/config/main-config.module';

@Module({
    imports: [
        MainConfigModule,
        MikroOrmModule.forRoot(),
        AuthModule
    ]
})
export class AppModule { }