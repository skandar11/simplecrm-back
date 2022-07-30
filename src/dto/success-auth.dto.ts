import { ApiProperty } from "@nestjs/swagger";

export class SuccessAuthDto {
    @ApiProperty()
    accessToken: string;

    @ApiProperty()
    refreshToken: string;
}