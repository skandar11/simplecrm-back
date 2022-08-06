import { SetTargetDto } from './../dto/set-target.dto';
import { UserPayloadModel } from 'src/models/user-payload.model';
import { TargetService } from './../services/target.service';
import { UniDecorators } from '@unistory/route-decorators';
import { getUser } from 'src/infra/guards/get-user.decorator';
import { Body } from '@nestjs/common';

@UniDecorators.Controller("targets")
export class TargetController {
    constructor(private readonly _targetService: TargetService) { }

    @UniDecorators.Post("", "set new target for user", false)
    setTarget(@getUser() payload: UserPayloadModel, @Body() setTargetDto: SetTargetDto): Promise<void> {
        return this._targetService.setTarget(payload.id, setTargetDto);
    }
}