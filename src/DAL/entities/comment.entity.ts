import { TargetEntity } from './target.entity';
import { Entity, Enum, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";

import { v4 as uuid } from "uuid";
import { CommentTypeEnum } from './../../infra/enums/comment-type.enum';

@Entity({ tableName: "comment" })
export class CommentEntity {
    @PrimaryKey()
    id: string;

    @Property()
    content: string;

    @Enum(() => CommentTypeEnum)
    commentType: CommentTypeEnum;

    @Property()
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