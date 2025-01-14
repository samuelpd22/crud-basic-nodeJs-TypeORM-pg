import { NextFunction, Request, Response, Router } from "express";
import UserRepository from "../repository/UserRepository";
import IUser from "../interface/IUser";
import { BadRequestError, NotFoundError } from "../helpers/api-error";

const userRouter = Router();

//GetMapping
userRouter.get('/', async (_req: Request, res: Response): Promise<void> => {
    try {
        const users = await UserRepository.getUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;  // Pegando o ID da URL

        const userExist = await UserRepository.findById(parseInt(id));

        if (!userExist) {
            throw new NotFoundError("Usuário não encontrado!");
        }

        res.status(200).json(userExist);  // Retorna o usuário caso ele seja encontrado
    } catch (error) {
        next(error);  // Passa o erro para o middleware de erro
    }
});


//PostMapping
userRouter.post('/', async (req: Request, res: Response,next: NextFunction): Promise<void> => {
    try {
        const userData: IUser = req.body; 
    
        const newUser = await UserRepository.createUser(userData);  

        if(!newUser) {
            throw new BadRequestError("Usuário já cadastrado!")
        }

        res.status(201).json(newUser);  // Retorna o usuário criado com status 201 (Created)
    } catch (error) {
        next(error);  // Passa o erro para o middleware de erro
    }
});

//PutMapping
userRouter.put('/:id', async (req: Request, res: Response, next:NextFunction): Promise<void> => {
    try {
        const { id } = req.params;  // Pegando o ID da URL
        const userData: IUser = req.body;  // Pegando os dados do usuário do corpo da requisição

        const updatedUser = await UserRepository.updateUser(id, userData);

        if (!updatedUser) {
            throw new NotFoundError("Usuário com ID informado, não existe!")
        } else {
            res.status(200).json(updatedUser);  // Retorna o usuário atualizado
        }
    } catch (error) {
        next(error)
    }
});

//DeleteMapping
userRouter.delete('/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;  // Pegando o ID do usuário da URL

    
        const deleteResult = await UserRepository.deleteUser(id);

        if (deleteResult) {
            res.status(200).json({ message: "User deleted successfully" });
        } else {
            res.status(404).json({ message: "User not found" });  // Caso o usuário não seja encontrado
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


export default userRouter;