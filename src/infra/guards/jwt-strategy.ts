import { Injectable, } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"

import { Strategy, ExtractJwt } from "passport-jwt"
import { UserPayloadModel } from '../../models/user-payload.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        })
    }

    async validate(payload: UserPayloadModel): Promise<UserPayloadModel> {
        return payload
    }
}