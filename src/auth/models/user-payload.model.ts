import { UserRoleEnum } from './../user-role.enum';

export class UserPayloadModel {
    id: string;
    login: string;
    role: UserRoleEnum;
    createdAt: Date;
}