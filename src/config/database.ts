/* eslint-disable @typescript-eslint/no-var-requires */
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entity/User.entity";
import { Video } from "../entity/Video.entity";
const dotenv = require("dotenv");

dotenv.config();
export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User, Video],
    migrations: [],
    subscribers: [],
});
