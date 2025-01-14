import { NextFunction, Response ,Request } from "express";
import { ApiError } from "../helpers/api-error";

/* const errorMiddleware = (err:Error, req:Request, res:Response, next:NextFunction) => {
    console.log("Caiu no tratamento de error middlaware!");
    //const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Ocorreu um erro interno no servidor!';
    res.status(500).json({
        success: false,
        status: 500,
        message: errMsg,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    })
}

export default errorMiddleware; 
*/

const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log("Caiu no tratamento de erro middleware!");

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      status: err.statusCode,
      message: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : {},
    });
  }

  // Para outros erros não tratados
  return res.status(500).json({
    success: false,
    status: 500,
    message: "Erro interno do servidor!",
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
};

export default errorMiddleware;
