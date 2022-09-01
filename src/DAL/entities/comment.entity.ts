import { Entity, Enum, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";

import { AutoMap } from '@automapper/classes';
import { v4 as uuid } from "uuid";

import { CommentTypeEnum } from './../../infra/enums/comment-type.enum';
import { CommentRepository } from './../repositories/comment.repository';
import { TargetEntity } from './target.entity';

@Entity({ tableName: "comment", customRepository: () => CommentRepository })
export class CommentEntity {
    @PrimaryKey()
    @AutoMap()
    id: string;

    @Property()
    @AutoMap()
    content: string;

    @Enum(() => CommentTypeEnum)
    @AutoMap()
    commentType: CommentTypeEnum;

    @Property()
    @AutoMap()
    createdAt: Date;

    @ManyToOne(() => TargetEntity)
    target?: TargetEntity;

    constructor(content: string, commentType: CommentTypeEnum) {
        this.id = uuid();
        this.content = content;
        this.commentType = commentType;

        this.createdAt = new Date();
    }
}