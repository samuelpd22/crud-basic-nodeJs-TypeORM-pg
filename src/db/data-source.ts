import { DataSource } from "typeorm";
import 'reflect-metadata'
import { CreateTableUser1736812233187 } from "./migrations/1736812233187-CreateTableUser";
import User from "../app/entity/User";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1",
    database: "postgres",
    synchronize: true,
    logging: true,
    entities: [User],
    subscribers: [],
    migrations: [CreateTableUser1736812233187],
})