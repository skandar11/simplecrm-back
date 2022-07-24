import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { ServiceModule } from 'src/services/service.module';

@Module({
    imports: [
        ServiceModule,
        PassportModule.register({ defaultStrategy: "jwt" }),
    ],
    controllers: [AuthController],
})
export class ControllerModule { }