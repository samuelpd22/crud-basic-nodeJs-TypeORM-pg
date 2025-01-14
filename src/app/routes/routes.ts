import { Router } from "express";
import userRouter from "../controller/UserController";

const routers = Router();

routers.use('/users',userRouter);

export default routers;