import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entity/User";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "ytb-share-user",
    password: "ytb-share-password",
    database: "ytb-share-db",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
});
