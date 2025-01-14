import express from 'express';
import 'reflect-metadata'
import { AppDataSource} from './db/data-source'
import routers from './app/routes/routes';
import errorMiddleware from './app/middlawares/error';
const app = express();

app.use(express.json());

app.use(routers); 

app.use(errorMiddleware)

AppDataSource.initialize().then( async () => { 
    console.log("Database Ok");
    app.listen(3333, () => {
        console.log("Servidor iniciado com sucesso!")
    })
})