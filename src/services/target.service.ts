import { ClientInfoEntity } from './../DAL/entities/client-info.entity';
import { TargetEntity } from './../DAL/entities/target.entity';
import { Injectable } from '@nestjs/common';

import { UniHttpException } from '@unistory/nestjs-common';

import { SetTargetDto } from './../dto/set-target.dto';
import { ClientInfoRepository } from './../DAL/repositories/client.repository';
import { UserRepository } from 'src/DAL/repositories/user.repository';
import { TargetRepository } from './../DAL/repositories/target.repository';
import { TargetStatus } from 'src/infra/enums/target-status.enum';

@Injectable()
export class TargetService {
    constructor(
        private readonly _targetRepo: TargetRepository,
        private readonly _clientInfoRepo: ClientInfoRepository,
        private readonly _userRepo: UserRepository
    ) { }

    public async setTarget(userId: string, setTargetDto: SetTargetDto): Promise<void> {
        const { clientInfoId, desire } = setTargetDto;
        const info = await this._clientInfoRepo.findOne({ id: clientInfoId });

        if (info == null) {
            throw new UniHttpException("Info not found");
        }

        const client = await this._userRepo.findOne({ clientInfo: info, createdBy: userId });
        if (client == null) {
            throw new UniHttpException("Client not found");
        }

        const isClientHaveActiveTarget = await this.checkClientOnActiveTarget(info);
        if (isClientHaveActiveTarget) {
            throw new UniHttpException("Client already have active target");
        }

        const target = new TargetEntity(desire, info);
        await this._targetRepo.persistAndFlush(target);
    }

    private async checkClientOnActiveTarget(info: ClientInfoEntity): Promise<boolean> {
        const target = await this._targetRepo.findOne({ status: TargetStatus.Active, clientInfo: info });
        return target != null;
    }

}