import { TargetEntity } from './../DAL/entities/target.entity';
import { CommentTypeEnum } from './../infra/enums/comment-type.enum';
import { UniHttpException } from '@unistory/nestjs-common';
import { Injectable } from "@nestjs/common";

import { extension as getFileExtension } from "mime-types";
import { join } from 'path';
import * as fs from "fs";
import { v4 as uuid } from "uuid";
import { path as rootPath } from 'app-root-path';

import { TargetRepository } from "src/DAL/repositories/target.repository";
import { TargetStatus } from "src/infra/enums/target-status.enum";
import { CommentEntity } from './../DAL/entities/comment.entity';
import { CreateCommentDto } from './../dto/create-comment.dto';

@Injectable()
export class CommentService {
    private readonly pathToFileFolder = join(rootPath, "/public");

    constructor(private readonly _targetRepo: TargetRepository) { }

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

            this._targetRepo.persist(comment);
        }

        if (createCommentDto.text != null) {
            const comment = this.createTextComment(createCommentDto.text);
            comment.target = target;

            this._targetRepo.persist(comment);
        }

        await this._targetRepo.flush();
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
            clientInfo: { user: { id: userId } },
            status: TargetStatus.Active
        });
    }

    private saveFile(buffer: Buffer, mimeType: string): string {
        const name = uuid();
        const extension = getFileExtension(mimeType);
        const fullPath = join(this.pathToFileFolder, `${name}.${extension}`);

        fs.writeFileSync(fullPath, buffer);
        return fullPath;
    }
}