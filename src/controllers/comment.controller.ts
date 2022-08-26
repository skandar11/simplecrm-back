import { CreateCommentDto } from './../dto/create-comment.dto';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from "@nestjs/platform-express";
import { Body, Param, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";

import { Roles } from "src/infra/guards/roles.decorator";
import { RolesGuard } from 'src/infra/guards/roles.guard';
import { UniDecorators } from "@unistory/route-decorators";
import { getUser } from "src/infra/guards/get-user.decorator";

import { UserRoleEnum } from "src/infra/enums/user-role.enum";
import { UserPayloadModel } from "src/models/user-payload.model";

@UniDecorators.Controller("comments")
//@UseGuards(AuthGuard(), RolesGuard)
//@Roles(UserRoleEnum.Coach)
export class CommentController {
    constructor() { }

    // add limit on file size
    @UniDecorators.Post("/target/", "Upload comment file (and) or text")
    @UseInterceptors(FilesInterceptor("file", 1, { limits: { fieldSize: 5000000 } }))
    public async addFileToTarget(@getUser() payload: UserPayloadModel,
        @UploadedFiles() file: Express.Multer.File[],
        @Param("id") id: string, @Body() createCommentDto: CreateCommentDto
    ): Promise<void> {
        console.log(file);
        console.log(createCommentDto.text)
        return
    }
}