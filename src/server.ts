import express from 'express';
import 'reflect-metadata'
import { AppDataSource} from './db/data-source'
import userRouter from './app/controllers/UserController';
import routers from './app/routers/routes';

const app = express();

app.use(express.json());

app.use(routers); 

AppDataSource.initialize().then( async () => { 
    console.log("Database Ok");
    app.listen(3333, () => {
        console.log("Servidor iniciado com sucesso!")
    })
})