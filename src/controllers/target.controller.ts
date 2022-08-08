import { AuthGuard } from '@nestjs/passport';
import { Body, Param, UseGuards } from '@nestjs/common';

import { UniDecorators } from '@unistory/route-decorators';

import { UpdateTargetDto } from './../dto/update-target.dto';
import { SetTargetDto } from './../dto/set-target.dto';

import { Roles } from 'src/infra/guards/roles.decorator';
import { getUser } from 'src/infra/guards/get-user.decorator';

import { UserPayloadModel } from 'src/models/user-payload.model';
import { TargetService } from './../services/target.service';
import { RolesGuard } from 'src/infra/guards/roles.guard';
import { UserRoleEnum } from 'src/infra/enums/user-role.enum';

@UniDecorators.Controller("targets")
@UseGuards(AuthGuard(), RolesGuard)
@Roles(UserRoleEnum.Coach)
export class TargetController {
    constructor(private readonly _targetService: TargetService) { }

    @UniDecorators.Post("", "set new target for user", false)
    setTarget(@getUser() payload: UserPayloadModel, @Body() setTargetDto: SetTargetDto): Promise<void> {
        console.log(payload);
        return this._targetService.setTarget(payload.id, setTargetDto);
    }

    @UniDecorators.Put(":id", "update target by id", false)
    update(@getUser() payload: UserPayloadModel, @Param("id") id: string, @Body() updateTargetDto: UpdateTargetDto): Promise<void> {
        return this._targetService.updateTarget(payload.id, id, updateTargetDto);
    }

    @UniDecorators.Get("all/:clientId", "get all targets by client id", false)
    getAll(@getUser() payload: UserPayloadModel, @Param("clientId") clientId: string): Promise<any> {
        return this._targetService.getAll(payload.id, clientId);
    }

    @UniDecorators.Delete(":id", "soft deleting target by id", false)
    deleteTarget(@getUser() payload: UserPayloadModel, @Param("id") id: string): Promise<void> {
        return this._targetService.deleteTarget(payload.id, id);
    }
}