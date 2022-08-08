import { Module } from "@nestjs/common";

import { MikroOrmModule } from "@mikro-orm/nestjs"

import { ControllerModule } from './controllers/controller.module';
import { MainConfigModule } from './infra/config/main-config.module';
import { LoggerModule } from "@unistory/nestjs-logger";
import { MainConfigService } from "./infra/config/main-config.service";

@Module({
    imports: [
        MainConfigModule,
        MikroOrmModule.forRoot(),
        ControllerModule,
        LoggerModule.forRootAsync({
            imports: [MainConfigModule],
            useFactory: (config: MainConfigService) => config.elasticSearchConfig,
            inject: [MainConfigService]
        })
    ]
})
export class AppModule { }