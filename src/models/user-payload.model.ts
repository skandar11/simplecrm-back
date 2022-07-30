import { UserRoleEnum } from '../infra/enums/user-role.enum';

export class UserPayloadModel {
    id: string;
    login: string;
    role: UserRoleEnum;
    createdAt: Date;
}