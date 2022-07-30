import { ApiProperty } from "@nestjs/swagger";

export class ClientCredoDto {
    @ApiProperty()
    login: string;

    @ApiProperty()
    password: string;
}