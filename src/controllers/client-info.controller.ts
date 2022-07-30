import { SetClientInfoDto } from './../dto/set-client-info.dto';
import { ClientInfoService } from './../services/client-info.service';
import { Body, Controller, UseGuards } from "@nestjs/common";
import { UniDecorators } from '@unistory/route-decorators';
import { getUser } from 'src/infra/guards/get-user.decorator';
import { UserPayloadModel } from 'src/models/user-payload.model';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/infra/guards/roles.guard';
import { UserRoleEnum } from 'src/infra/enums/user-role.enum';
import { Roles } from 'src/infra/guards/roles.decorator';

@Controller("client-info")
export class ClientInfoController {
    constructor(private readonly _clientInfoService: ClientInfoService) { }

    @UniDecorators.Post("", "set client info", false)
    @UseGuards(AuthGuard(), RolesGuard)
    @Roles(UserRoleEnum.Coach)
    setClientInfo(@getUser() payload: UserPayloadModel, @Body() setClientInfoDto: SetClientInfoDto): Promise<void> {
        return this._clientInfoService.setClientInfo(payload.id, setClientInfoDto);
    }
}