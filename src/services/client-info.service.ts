import { UpdateClientInfoDto } from './../dto/update-client-info.dto';
import { UniHttpException } from '@unistory/nestjs-common';
import { Injectable } from '@nestjs/common';

import { UserRepository } from 'src/DAL/repositories/user.repository';
import { ClientInfoRepository } from './../DAL/repositories/client.repository';

import { MapperUtil } from './../infra/utils/mapper.util';
import { ClientStatus } from 'src/infra/enums/client-status.enum';

import { ClientInfoDto } from './../dto/client-info.dto';
import { SetClientInfoDto } from './../dto/set-client-info.dto';
import { ClientInfoEntity } from './../DAL/entities/client-info.entity';

@Injectable()
export class ClientInfoService {
    constructor(
        private readonly _userRepository: UserRepository,
        private readonly _clientInfoRepository: ClientInfoRepository
    ) { }

    public async getOne(userId: string, clientId: string): Promise<ClientInfoDto> {
        const client = await this.getClientInfoByIdOrFail(userId, clientId);

        const mappedClient = MapperUtil.mapClientInfo([client]);
        return mappedClient[0];
    }

    public async getAll(userId: string): Promise<ClientInfoDto[]> {
        const clients = await this._userRepository.find({
            createdBy: userId,
            clientInfo: { status: { $ne: ClientStatus.Deleted } }
        }, {
            populate: ["clientInfo"],
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

    public async delete(userId: string, clientId: string): Promise<void> {
        const info = await this.getClientInfoByIdOrFail(userId, clientId);
        if (info.status == ClientStatus.Deleted) {
            throw new UniHttpException("Client with id {id}: already deleted", clientId);
        }

        info.status = ClientStatus.Deleted;
        await this._clientInfoRepository.persistAndFlush(info);
    }

    public async updateClientInfo(userId: string, clientId: string, updateClientInfoDto: UpdateClientInfoDto): Promise<void> {
        const info = await this.getClientInfoByIdOrFail(userId, clientId);
        const { birthDay, contraindications, email, name, phoneNumber } = updateClientInfoDto;

        if (birthDay != null) {
            info.birthDay = birthDay;
        }

        if (contraindications != null) {
            info.contraindications = contraindications;
        }

        if (email != null) {
            info.email = email;
        }

        if (name != null) {
            info.name = name;
        }

        if (phoneNumber != null) {
            info.phoneNumber = phoneNumber;
        }

        await this._clientInfoRepository.persistAndFlush(info);
    }

    private async getClientInfoByIdOrFail(userId: string, clientId: string): Promise<ClientInfoEntity> {
        const client = await this._userRepository.findOne({
            createdBy: userId,
            clientInfo: { id: clientId }
        }, {
            populate: ["clientInfo"],
            fields: ["clientInfo"]
        });

        if (client == null) {
            throw new UniHttpException("Client with id {id}: not found", clientId);
        }

        return client.clientInfo;
    }

}