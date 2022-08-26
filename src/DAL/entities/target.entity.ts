import { Cascade, Collection, Entity, Enum, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';

import { v4 as uuid } from "uuid";

import { CommentEntity } from './comment.entity';
import { ClientInfoEntity } from './client-info.entity';

import { TargetRepository } from './../repositories/target.repository';
import { TargetStatus } from './../../infra/enums/target-status.enum';

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

    @OneToMany(() => CommentEntity, comment => comment.target, { cascade: [Cascade.ALL] })
    comments = new Collection<CommentEntity>(this);

    constructor(desire: string, clientInfo: ClientInfoEntity) {
        this.id = uuid();
        this.desire = desire;
        this.clientInfo = clientInfo;
        this.status = TargetStatus.Active;
    }
}