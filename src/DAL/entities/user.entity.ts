import { UserRoleEnum } from '../../infra/enums/user-role.enum';
import { Entity, Enum, PrimaryKey, Property } from "@mikro-orm/core";

import { v4 as uuid } from "uuid"
import { UserRepository } from '../repositories/user.repository';
import { UserPayloadModel } from "src/models/user-payload.model";

@Entity({ tableName: "user", customRepository: () => UserRepository })
export class UserEntity {
    @PrimaryKey()
    id: string;

    @Property({ unique: true })
    login: string;

    @Property()
    password: string;

    @Property()
    salt: string;

    @Enum(() => UserRoleEnum)
    role: UserRoleEnum;

    @Property({ nullable: true })
    createdBy?: string;

    @Property({ onCreate: () => new Date() })
    createdAt: Date;

    constructor(login: string, password: string, salt: string, isCoach = true) {
        this.id = uuid();
        this.login = login;
        this.password = password;
        this.salt = salt;
        this.role = isCoach ? UserRoleEnum.Coach : UserRoleEnum.Client;
    }

    get payload(): UserPayloadModel {
        return {
            id: this.id,
            login: this.login,
            role: this.role,
            createdAt: this.createdAt
        };
    }
}