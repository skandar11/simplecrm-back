import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { ClientInfoController } from './client-info.controller';
import { ServiceModule } from 'src/services/service.module';
import { JwtStrategy } from 'src/infra/guards/jwt-strategy';

@Module({
    imports: [
        ServiceModule,
        PassportModule.register({ defaultStrategy: "jwt" }),
    ],
    controllers: [AuthController, ClientInfoController],
    providers: [JwtStrategy]
})
export class ControllerModule { }