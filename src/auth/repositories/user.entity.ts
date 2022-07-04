import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

import { v4 as uuid } from "uuid"
import { UserRepository } from './user.repository';
import { UserPayloadModel } from "src/auth/models/user-payload.model";

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

    @Property({ onCreate: () => new Date() })
    createdAt: Date;

    constructor(login: string, password: string, salt: string) {
        this.id = uuid();
        this.login = login;
        this.password = password;
        this.salt = salt;
    }

    get payload(): UserPayloadModel {
        return {
            id: this.id,
            login: this.login,
            createdAt: this.createdAt
        };
    }
}