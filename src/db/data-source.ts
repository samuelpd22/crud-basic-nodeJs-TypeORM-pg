import { DataSource } from "typeorm";
import 'reflect-metadata'
import User from "../app/entities/User";
import { CreateUserTable1736621013274 } from "./migrations/1736621013274-CreateUserTable";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1",
    database: "migrations",
    synchronize: true,
    logging: true,
    entities: [User],
    subscribers: [],
    migrations: [CreateUserTable1736621013274],
})