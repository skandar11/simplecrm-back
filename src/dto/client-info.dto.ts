import { ClientStatus } from './../infra/enums/client-status.enum';
import { ApiProperty } from "@nestjs/swagger";

export class ClientInfoDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    phoneNumber: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    birthDay: Date;

    @ApiProperty()
    contraindications: string;

    @ApiProperty()
    status: ClientStatus;

    @ApiProperty()
    updateAt: Date;

    @ApiProperty()
    createAt: Date;
}