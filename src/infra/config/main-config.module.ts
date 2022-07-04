import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { join } from 'path';
import { MainConfigService } from 'src/infra/config/main-config.service';
import { path } from "app-root-path";

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: join(path, `.${process.env.NODE_ENV}.env`),
            isGlobal: true,
            expandVariables: true
        })
    ],
    providers: [MainConfigService],
    exports: [MainConfigService]
})
export class MainConfigModule { }