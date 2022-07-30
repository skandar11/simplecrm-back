import { Entity, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";

import { v4 as uuid } from "uuid";

import { ClientInfoRepository } from "../repositories/client.repository";
import { UserEntity } from "./user.entity";

@Entity({ tableName: "client_info", customRepository: () => ClientInfoRepository })
export class ClientInfoEntity {
    @PrimaryKey()
    id: string;

    @Property()
    phoneNumber: string;

    @Property()
    name: string;

    @Property()
    email: string;

    @Property()
    birthDay: Date;

    @Property()
    about: string;

    @Property()
    contraindications: string;

    @OneToOne(() => UserEntity, user => user.clientInfo)
    user: UserEntity;

    constructor(phoneNumber: string, name: string, email: string) {
        this.id = uuid();
        this.phoneNumber = phoneNumber;
        this.name = name;
        this.email = email;
    }

    public setAdditionalInfo(birthDay: Date, about: string, contraindications: string) {
        this.birthDay = birthDay;
        this.about = about;
        this.contraindications = contraindications;
    }
}