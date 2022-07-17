import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { UserRoleEnum } from '../../auth/user-role.enum';

/*
  Декоратор должен использоваться совместно с AuthGuard, поскольку ожидает user в request
*/

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<UserRoleEnum[]>("roles", context.getHandler())
        if (!roles) {
            return true
        }

        const request = context.switchToHttp().getRequest()
        const user = request.user
        return roles.includes(user.role)
    }
}