import { ApiProperty } from '@nestjs/swagger';
import { CommentTypeEnum } from './../infra/enums/comment-type.enum';

export class CommentDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    content: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty({ enum: CommentTypeEnum })
    commentType: CommentTypeEnum;
}