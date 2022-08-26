import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { TargetController } from './target.controller';
import { ClientInfoController } from './client-info.controller';

import { ServiceModule } from 'src/services/service.module';
import { JwtStrategy } from 'src/infra/guards/jwt-strategy';
import { CommentController } from './comment.controller';

@Module({
    imports: [
        ServiceModule,
        PassportModule.register({ defaultStrategy: "jwt" }),
    ],
    controllers: [AuthController, ClientInfoController, TargetController, CommentController],
    providers: [JwtStrategy]
})
export class ControllerModule { }