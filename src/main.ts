import { MikroORM } from "@mikro-orm/core";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { ApiCookieAuth, DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { LoggerService } from "@unistory/nestjs-logger";
import { UniResponseInterceptor } from "@unistory/nestjs-common";

import { AppModule } from './app.module';
import { MainConfigService } from "./infra/config/main-config.service";
import { config as dbConfig } from "./infra/mikro-orm.config"
import { NestExpressApplication } from "@nestjs/platform-express";
import { Constants } from "./infra/constants";

async function main() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const orm = await MikroORM.init(dbConfig);
    const migrator = orm.getMigrator();

    await migrator.up();
    await orm.close();

    app.enableCors({ origin: "http://80.78.244.97:3001" });
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        })
    );

    const logger = app.get(LoggerService);
    app.useGlobalInterceptors(new UniResponseInterceptor(logger));

    app.setGlobalPrefix("api");

    const config = app.get(MainConfigService);

    const swaggerConfig = config.swaggerConfigModel;
    const docsConfig = new DocumentBuilder()
        .setTitle(swaggerConfig.title)
        .setDescription(swaggerConfig.description)
        .setVersion(swaggerConfig.version)
        .addTag(swaggerConfig.tag)
        .setContact(
            swaggerConfig.name,
            swaggerConfig.site,
            swaggerConfig.email
        )
        .build();
    const docs = SwaggerModule.createDocument(app, docsConfig);
    SwaggerModule.setup("api/swagger", app, docs);

    app.useStaticAssets(Constants.PATH_TO_STATIC_FOLDER, {
        prefix: "/api/public/"
    });

    app.listen(config.port || 3000);
}

main();