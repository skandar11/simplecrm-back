import { AuthGuard } from '@nestjs/passport';
import { UniDecorators } from '@unistory/route-decorators';
import { Body, Controller, HttpCode, HttpStatus, Param, UseGuards } from "@nestjs/common";

import { ClientInfoDto } from './../dto/client-info.dto';
import { SetClientInfoDto } from './../dto/set-client-info.dto';
import { ClientInfoService } from './../services/client-info.service';

import { getUser } from 'src/infra/guards/get-user.decorator';
import { Roles } from 'src/infra/guards/roles.decorator';

import { UserPayloadModel } from 'src/models/user-payload.model';
import { RolesGuard } from 'src/infra/guards/roles.guard';
import { UserRoleEnum } from 'src/infra/enums/user-role.enum';

@Controller("client-info")
@UseGuards(AuthGuard(), RolesGuard)
@Roles(UserRoleEnum.Coach)
export class ClientInfoController {
    constructor(private readonly _clientInfoService: ClientInfoService) { }

    @UniDecorators.Post("", "set client info", false)
    setClientInfo(@getUser() payload: UserPayloadModel, @Body() setClientInfoDto: SetClientInfoDto): Promise<void> {
        return this._clientInfoService.setClientInfo(payload.id, setClientInfoDto);
    }

    @UniDecorators.Get("/all", "get all clients-info", true, ClientInfoDto)
    getAll(@getUser() payload: UserPayloadModel): Promise<ClientInfoDto[]> {
        return this._clientInfoService.getAll(payload.id);
    }

    @UniDecorators.Get("/one/:id", "get concrete clients-info", true, ClientInfoDto)
    getOne(@getUser() payload: UserPayloadModel, @Param("id") id: string): Promise<ClientInfoDto> {
        return this._clientInfoService.getOne(payload.id, id);
    }

    @UniDecorators.Delete(":id", "soft deleting by id", false)
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteClientInfo(@getUser() payload: UserPayloadModel, @Param("id") id: string): Promise<void> {
        return this._clientInfoService.delete(payload.id, id);
    }
}