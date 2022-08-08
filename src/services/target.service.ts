import { Injectable } from '@nestjs/common';

import { UniHttpException } from '@unistory/nestjs-common';
import { MapperUtil } from './../infra/utils/mapper.util';

import { TargetDto } from 'src/dto/target.dto';
import { SetTargetDto } from './../dto/set-target.dto';
import { UpdateTargetDto } from './../dto/update-target.dto';
import { TargetEntity } from './../DAL/entities/target.entity';
import { ClientInfoEntity } from './../DAL/entities/client-info.entity';

import { TargetStatus } from 'src/infra/enums/target-status.enum';
import { UserRepository } from 'src/DAL/repositories/user.repository';
import { TargetRepository } from './../DAL/repositories/target.repository';
import { ClientInfoRepository } from './../DAL/repositories/client.repository';

@Injectable()
export class TargetService {
    constructor(
        private readonly _targetRepo: TargetRepository,
        private readonly _clientInfoRepo: ClientInfoRepository,
        private readonly _userRepo: UserRepository
    ) { }

    public async deleteTarget(userId: string, targetId: string): Promise<void> {
        const target = await this._targetRepo.findOne({
            id: targetId,
            clientInfo: {
                user: { createdBy: userId }
            }
        });

        if (target == null) {
            throw new UniHttpException("Target with id {id}: not found", targetId)
        }

        if (target.status == TargetStatus.Deleted) {
            throw new UniHttpException("Already deleted");
        }

        target.status = TargetStatus.Deleted;
        await this._targetRepo.persistAndFlush(target);
    }

    public async setTarget(userId: string, setTargetDto: SetTargetDto): Promise<void> {
        const { clientInfoId, desire } = setTargetDto;

        const info = await this._clientInfoRepo.findOne({
            id: clientInfoId,
            user: { createdBy: userId }
        });

        if (info == null) {
            throw new UniHttpException("Client info with id {id}: not found", clientInfoId);
        }

        const isClientHaveActiveTarget = await this.checkClientOnActiveTarget(info);
        if (isClientHaveActiveTarget) {
            throw new UniHttpException("Client already have active target");
        }

        const target = new TargetEntity(desire, info);
        await this._targetRepo.persistAndFlush(target);
    }

    public async updateTarget(userId: string, targetId: string, updateTargetDto: UpdateTargetDto): Promise<void> {
        const target = await this._targetRepo.findOne({
            id: targetId,
            clientInfo: {
                user: { createdBy: userId }
            }
        }, {
            populate: ["clientInfo"]
        });

        if (target == null) {
            throw new UniHttpException("Target with id = {id}: not found", targetId);
        }

        const { status, desire } = updateTargetDto;
        let changesCount = 0;

        if (status != null) {
            await this.updateStatus(target, status);
            changesCount++;
        }

        if (desire != null) {
            target.desire = desire;
            changesCount++;
        }

        if (changesCount > 0) {
            await this._targetRepo.persistAndFlush(target);
        }
    }

    public async getAll(userId: string, clientInfoId: string): Promise<TargetDto[]> {
        const targets = await this._targetRepo.find({
            clientInfo: {
                id: clientInfoId,
                user: { createdBy: userId }
            }
        });

        return MapperUtil.mapTarget(targets);
    }

    private async checkClientOnActiveTarget(info: ClientInfoEntity): Promise<boolean> {
        const target = await this._targetRepo.findOne({ status: TargetStatus.Active, clientInfo: info });
        return target != null;
    }

    private async updateStatus(target: TargetEntity, status: TargetStatus): Promise<void> {
        if (status == TargetStatus.Active) {
            if (await this.checkClientOnActiveTarget(target.clientInfo)) {
                throw new UniHttpException("Client already have active target");
            }
        }

        if (status == TargetStatus.Deleted) {
            throw new UniHttpException("Can't set that status");
        }

        target.status = status;
    }

}