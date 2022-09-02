import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { TargetController } from './target.controller';
import { ClientInfoController } from './client-info.controller';
import { CommentController } from './comment.controller';
import { ProductController } from './product.controller';

import { ServiceModule } from 'src/services/service.module';
import { JwtStrategy } from 'src/infra/guards/jwt-strategy';

@Module({
    imports: [
        ServiceModule,
        PassportModule.register({ defaultStrategy: "jwt" }),
    ],
    controllers: [AuthController, ClientInfoController, TargetController, CommentController, ProductController],
    providers: [JwtStrategy]
})
export class ControllerModule { }