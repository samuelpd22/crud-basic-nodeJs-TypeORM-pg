import User from "../entities/User";
import IUser from "../interfaces/IUser";
import { AppDataSource } from "../../db/data-source";

const userRepository = AppDataSource.getRepository(User);

const getUsers = (): Promise<IUser[]> => {
    return userRepository.find();
}

const createUser = async (userData: IUser): Promise<IUser> => {
    const user = userRepository.create(userData);  // Cria uma nova instância de usuário
    return await userRepository.save(user);  // Salva o usuário no banco de dados
};


// Método para atualizar um usuário
const updateUser = async (id: string, userData: IUser): Promise<IUser | null> => {
    const user = await userRepository.findOneBy({ id: parseInt(id) });
    if (!user) return null;

    // Atualiza as propriedades do usuário
    user.name = userData.name || user.name;
    user.email = userData.email || user.email;
    

    return await userRepository.save(user);
};

// Método para deletar um usuário
const deleteUser = async (id: string): Promise<boolean> => {
    const user = await userRepository.findOneBy({ id: parseInt(id) });
    if (!user) return false;

    await userRepository.remove(user);
    return true;
};



export default { getUsers, createUser, updateUser, deleteUser };