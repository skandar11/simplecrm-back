import { ApiProperty } from '@nestjs/swagger';
import { TargetStatus } from './../infra/enums/target-status.enum';

export class TargetDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    desire: string;

    @ApiProperty()
    status: TargetStatus;

    @ApiProperty()
    createdAt: Date;
}