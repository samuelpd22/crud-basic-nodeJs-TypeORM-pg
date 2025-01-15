import express from 'express';
import 'express-async-errors'
import { AppDataSource} from './db/data-source'
import routers from './app/routers/routes';


const app = express();

app.use(express.json());

app.use(routers); 



//app.use(errorMiddleware);


AppDataSource.initialize().then( async () => { 
    console.log("Database Ok");

    
    app.listen(3333, () => {
        console.log("Servidor iniciado com sucesso!")
    })
});
