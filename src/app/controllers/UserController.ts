import { Request, Response, Router } from "express";
import UserRepository from "../repositories/UserRepository";
import IUser from "../interfaces/IUser";

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

//PostMapping
userRouter.post('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const userData: IUser = req.body; 
    
        // Chama o repositório para salvar o novo usuário
        const newUser = await UserRepository.createUser(userData);  // Método createUser no repositório

        res.status(201).json(newUser);  // Retorna o usuário criado com status 201 (Created)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

//PutMapping
userRouter.put('/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;  // Pegando o ID da URL
        const userData: IUser = req.body;  // Pegando os dados do usuário do corpo da requisição

        const updatedUser = await UserRepository.updateUser(id, userData);

        if (updatedUser) {
            res.status(200).json(updatedUser);  // Retorna o usuário atualizado
        } else {
            res.status(404).json({ message: "User not found" });  // Caso o usuário não seja encontrado
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
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
