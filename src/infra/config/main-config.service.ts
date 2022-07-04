import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";
import { SwaggerConfigModel } from "src/infra/config/models/swagger-config.model";

@Injectable()
export class MainConfigService {
    constructor(
        private readonly _configService: ConfigService
    ) { }

    get port(): number {
        return Number(this._configService.get<string>("APP_PORT"));
    }

    get swaggerConfigModel(): SwaggerConfigModel {
        return {
            title: this._configService.get<string>("SW_TITLE"),
            description: this._configService.get<string>("SW_DESCRIPTION"),
            version: this._configService.get<string>("SW_VERSION"),
            tag: this._configService.get<string>("SW_TAG"),
            name: this._configService.get<string>("SW_CONTACT_NAME"),
            site: this._configService.get<string>("SW_CONTACT_SITE"),
            email: this._configService.get<string>("SW_CONTACT_EMAIL")
        };
    }

    get jwtOptions(): JwtModuleOptions {
        return {
            secret: this._configService.get<string>("JWT_SECRET"),
            signOptions: {
                algorithm: "HS256",
                expiresIn: this._configService.get<string>("JWT_EXPIRES")
            }
        }
    }
}