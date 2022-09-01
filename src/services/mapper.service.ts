import { Injectable } from '@nestjs/common';

import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/core';
import { createMap } from "@automapper/core";

import { CommentDto } from 'src/dto/comment.dto';
import { CommentEntity } from 'src/DAL/entities/comment.entity';

@Injectable()
export class MapperService extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(mapper, CommentEntity, CommentDto);
        };
    }
}