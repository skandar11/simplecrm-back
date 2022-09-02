import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from "@automapper/classes"

import { CommentTypeEnum } from './../infra/enums/comment-type.enum';

export class CommentDto {
    @ApiProperty()
    @AutoMap()
    id: string;

    @ApiProperty()
    @AutoMap()
    content: string;

    @ApiProperty()
    @AutoMap()
    createdAt: Date;

    @ApiProperty({ enum: CommentTypeEnum })
    @AutoMap()
    commentType: CommentTypeEnum;
}