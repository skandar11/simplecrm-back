import { ApiProperty } from "@nestjs/swagger";

export class NewRecordDto {
    @ApiProperty()
    id: string;
}