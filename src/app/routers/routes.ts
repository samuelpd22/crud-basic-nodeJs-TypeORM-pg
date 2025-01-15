import { Router } from "express";
import userRouter from "../controllers/UserController";


const routers = Router();

routers.use('/users',userRouter);
routers.use('/login',userRouter);


export default routers;