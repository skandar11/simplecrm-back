import { CommentEntity } from './../DAL/entities/comment.entity';
import { TargetEntity } from './../DAL/entities/target.entity';
import { LoadStrategy, Options } from "@mikro-orm/core";

import { path } from "app-root-path"
import { join } from 'path';

import { UserEntity } from "../DAL/entities/user.entity";
import { ClientInfoEntity } from './../DAL/entities/client-info.entity';

export const config: Options = {
    type: "postgresql",
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "postgres",
    dbName: "coach-crm",
    entities: [UserEntity, ClientInfoEntity, TargetEntity, CommentEntity],
    loadStrategy: LoadStrategy.JOINED,
    migrations: {
        path: join(path, "dist/infra/migrations"),
        pathTs: join(path, "src/infra/migrations"),
        allOrNothing: true
    }
}

export default config;