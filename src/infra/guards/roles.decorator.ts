import { UserRoleEnum } from '../enums/user-role.enum';
import { SetMetadata } from "@nestjs/common"

// tslint:disable-next-line: variable-name
export const Roles = (...roles: UserRoleEnum[]) => SetMetadata("roles", roles)