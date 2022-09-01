import { Constants } from './../infra/constants';
import { UniHttpException } from '@unistory/nestjs-common';
import { Injectable } from "@nestjs/common";

import { extension as getFileExtension } from "mime-types";
import { InjectMapper } from '@automapper/nestjs';
import * as fs from "fs";
import { join } from 'path';
import { v4 as uuid } from "uuid";
import type { Mapper } from "@automapper/core";

import { TargetEntity } from './../DAL/entities/target.entity';
import { CommentEntity } from './../DAL/entities/comment.entity';
import { TargetRepository } from "src/DAL/repositories/target.repository";

import { CreateCommentDto } from './../dto/create-comment.dto';
import { TargetStatus } from "src/infra/enums/target-status.enum";
import { CommentTypeEnum } from './../infra/enums/comment-type.enum';
import { CommentRepository } from 'src/DAL/repositories/comment.repository';
import { CommentDto } from 'src/dto/comment.dto';

@Injectable()
export class CommentService {
    constructor(
        private readonly _targetRepo: TargetRepository,
        private readonly _commentRepo: CommentRepository,
        @InjectMapper()
        private readonly _mapper: Mapper
    ) { }

    public async getAllTargetsComment(userId: string, targetId: string): Promise<CommentDto[]> {
        const comments = await this._commentRepo.getUserTargetComments(userId, targetId);
        return this._mapper.mapArray(comments, CommentEntity, CommentDto);
    }

    public async addFileToTarget(userId: string, file: Express.Multer.File, createCommentDto: CreateCommentDto): Promise<void> {
        const targetId = createCommentDto.destinationId;

        const target = await this.getValidTarget(targetId, userId);
        if (target == null) {
            throw new UniHttpException(`Valid target with id ${targetId} for user with id ${userId}: not found`);
        }

        if (file == null && createCommentDto.text == null) {
            throw new UniHttpException(`Not provided parameters`);
        }

        if (file != null) {
            const comment = this.createFileComment(file);
            comment.target = target;

            this._commentRepo.persist(comment);
        }

        if (createCommentDto.text != null) {
            const comment = this.createTextComment(createCommentDto.text);
            comment.target = target;

            this._commentRepo.persist(comment);
        }

        await this._commentRepo.flush();
    }

    private createFileComment(file: Express.Multer.File): CommentEntity {
        const pathToFile = this.saveFile(file.buffer, file.mimetype);
        return new CommentEntity(pathToFile, CommentTypeEnum.File);
    }

    private createTextComment(text: string): CommentEntity {
        return new CommentEntity(text, CommentTypeEnum.Text);
    }

    private async getValidTarget(targetId: string, userId: string): Promise<TargetEntity> {
        return await this._targetRepo.findOne({
            id: targetId,
            clientInfo: { user: { createdBy: userId } },
            status: TargetStatus.Active
        });
    }

    private saveFile(buffer: Buffer, mimeType: string): string {
        const name = uuid();
        const extension = getFileExtension(mimeType);

        const fullFileName = `${name}.${extension}`;
        const fullPath = join(Constants.PATH_TO_STATIC_FOLDER, fullFileName);

        fs.writeFileSync(fullPath, buffer);
        return this.getPathToFile(fullFileName);
    }

    private getPathToFile(fileName: string): string {
        return "api/public/" + fileName;
    }
}