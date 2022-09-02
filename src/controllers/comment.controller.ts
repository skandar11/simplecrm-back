
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from "@nestjs/platform-express";
import { Body, Param, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";

import { Roles } from "src/infra/guards/roles.decorator";
import { RolesGuard } from 'src/infra/guards/roles.guard';
import { UniDecorators } from "@unistory/route-decorators";
import { getUser } from "src/infra/guards/get-user.decorator";

import { UserRoleEnum } from "src/infra/enums/user-role.enum";
import { CreateCommentDto } from './../dto/create-comment.dto';
import { UserPayloadModel } from "src/models/user-payload.model";
import { CommentDto } from './../dto/comment.dto';
import { CommentService } from './../services/comment.service';

@UniDecorators.Controller("comments")
@UseGuards(AuthGuard(), RolesGuard)
@Roles(UserRoleEnum.Coach)
export class CommentController {
    constructor(private readonly _commentService: CommentService) { }

    @UniDecorators.Post("/target/", "Upload comment file (and) or text")
    @UseInterceptors(FilesInterceptor("file", 1, { limits: { fieldSize: 5000000 } }))
    public addFileToTarget(@getUser() payload: UserPayloadModel,
        @UploadedFiles() file: Express.Multer.File[],
        @Param("id") id: string, @Body() createCommentDto: CreateCommentDto
    ): Promise<void> {
        return this._commentService.addFileToTarget(payload.id, file[0], createCommentDto);
    }

    @UniDecorators.Get("/target/:id", "Get all comments", true, CommentDto)
    public getAllTargetsComment(@getUser() payload: UserPayloadModel, @Param("id") id: string): Promise<CommentDto[]> {
        return this._commentService.getAllTargetsComment(payload.id, id);
    }
}