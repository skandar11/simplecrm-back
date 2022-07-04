import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { UniResponseInterceptor } from "@unistory/nestjs-common";
import { MainConfigService } from "./infra/config/main-config.service";
import { AppModule } from './app.module';

async function main() {
    const app = await NestFactory.create(AppModule, { cors: true });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        })
    );

    app.useGlobalInterceptors(new UniResponseInterceptor());
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

    app.listen(config.port || 3000);
}

main();