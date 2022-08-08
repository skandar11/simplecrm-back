import { UniHttpException } from '@unistory/nestjs-common';
import { Injectable } from '@nestjs/common';

import { UserRepository } from 'src/DAL/repositories/user.repository';
import { ClientInfoRepository } from './../DAL/repositories/client.repository';

import { MapperUtil } from './../infra/utils/mapper.util';
import { ClientStatus } from 'src/infra/enums/client-status.enum';

import { ClientInfoDto } from './../dto/client-info.dto';
import { SetClientInfoDto } from './../dto/set-client-info.dto';
import { ClientInfoEntity } from './../DAL/entities/client-info.entity';
import { LoadStrategy } from '@mikro-orm/core';

@Injectable()
export class ClientInfoService {
    constructor(
        private readonly _userRepository: UserRepository,
        private readonly _clientInfoRepository: ClientInfoRepository
    ) { }

    public async getOne(userId: string, clientId: string): Promise<ClientInfoDto> {
        const client = await this._userRepository.findOne({ createdBy: userId }, { populateWhere: { clientInfo: { status: { $ne: ClientStatus.Deleted } } } })
        return;
    }

    public async getAll(userId: string): Promise<ClientInfoDto[]> {
        const clients = await this._userRepository.find({
            createdBy: userId
        }, {
            populateWhere: {
                clientInfo: {
                    status: { $ne: ClientStatus.Deleted }
                }
            },
            fields: ["clientInfo"]
        });

        const allClientsInfo = clients.map(item => item.clientInfo);
        return MapperUtil.mapClientInfo(allClientsInfo);
    }

    public async setClientInfo(userId: string, setClientInfoDto: SetClientInfoDto): Promise<void> {
        const client = await this._userRepository.findOne({ login: setClientInfoDto.phoneNumber });
        if (client == null) {
            throw new UniHttpException("Client not found");
        }

        if (client.createdBy != userId) {
            throw new UniHttpException("Client not found");
        }

        const existsInfo = await this._clientInfoRepository.findOne({ user: client });
        if (existsInfo != null) {
            throw new UniHttpException("Info already set");
        }

        const { phoneNumber, name, email, birthDay, contraindications } = setClientInfoDto;
        const info = new ClientInfoEntity(phoneNumber, name, email);
        info.setAdditionalInfo(birthDay, contraindications);

        info.user = client;

        await this._clientInfoRepository.persistAndFlush(info);
    }

}