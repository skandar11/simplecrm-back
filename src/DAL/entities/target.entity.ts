import { Entity, Enum, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';

import { v4 as uuid } from "uuid";

import { ClientInfoEntity } from './client-info.entity';
import { TargetStatus } from './../../infra/enums/target-status.enum';
import { TargetRepository } from './../repositories/target.repository';

@Entity({ tableName: "target", customRepository: () => TargetRepository })
export class TargetEntity {
    @PrimaryKey()
    id: string;

    @Property()
    desire: string;

    @Enum(() => TargetStatus)
    status: TargetStatus;

    @Property({ onCreate: () => new Date })
    createdAt: Date;

    @ManyToOne(() => ClientInfoEntity)
    clientInfo: ClientInfoEntity;

    constructor(desire: string, clientInfo: ClientInfoEntity) {
        this.id = uuid();
        this.desire = desire;
        this.clientInfo = clientInfo;
        this.status = TargetStatus.Active;
    }
}