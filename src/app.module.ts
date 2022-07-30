import { Module } from "@nestjs/common";

import { MikroOrmModule } from "@mikro-orm/nestjs"

import { ControllerModule } from './controllers/controller.module';
import { MainConfigModule } from './infra/config/main-config.module';

@Module({
    imports: [
        MainConfigModule,
        MikroOrmModule.forRoot(),
        ControllerModule
    ]
})
export class AppModule { }