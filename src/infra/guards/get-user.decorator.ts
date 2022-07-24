import { UserPayloadModel } from '../../models/user-payload.model';
import { createParamDecorator } from "@nestjs/common"

export const getUser = createParamDecorator((data, req): UserPayloadModel => {
    return req.args[0].user
})
