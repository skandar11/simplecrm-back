import { ClientStatus } from './../../infra/enums/client-status.enum';
import { TargetEntity } from './target.entity';
import { Cascade, Collection, Entity, Enum, OneToMany, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";

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
    contraindications: string;

    @Enum({ items: () => ClientStatus, array: false, default: [ClientStatus.WaitingPayment] })
    status: ClientStatus;

    @Property({ onUpdate: () => new Date() })
    updateAt: Date;

    @Property({ onCreate: () => new Date() })
    createdAt: Date;

    @OneToOne(() => UserEntity, user => user.clientInfo)
    user: UserEntity;

    @OneToMany(() => TargetEntity, target => target.clientInfo, { cascade: [Cascade.ALL] })
    targets = new Collection<TargetEntity>(this);

    constructor(phoneNumber: string, name: string, email: string) {
        this.id = uuid();
        this.updateAt = new Date();

        this.phoneNumber = phoneNumber;
        this.name = name;
        this.email = email;
    }

    public setAdditionalInfo(birthDay: Date, contraindications: string) {
        this.birthDay = birthDay;
        this.contraindications = contraindications;
    }
}