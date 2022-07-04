import { LoadStrategy, Options } from "@mikro-orm/core";

import { path } from "app-root-path"
import { join } from 'path';
import { UserEntity } from "../auth/repositories/user.entity";

const config: Options = {
    type: "postgresql",
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "postgres",
    dbName: "coach-crm",
    entities: [UserEntity],
    migrations: {
        path: join(path, "dist/infra/migrations"),
        pathTs: join(path, "src/infra/migrations"),
        allOrNothing: true
    },

}

export default config;