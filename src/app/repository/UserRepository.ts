import User from "../entity/User";
import IUser from "../interface/IUser";
import { AppDataSource } from "../../db/data-source";

const userRepository = AppDataSource.getRepository(User);

const getUsers = (): Promise<IUser[]> => {
    return userRepository.find();
}

const createUser = async (userData: IUser): Promise<IUser | null> => {
    const existingUser = await userRepository.findOneBy({ name: userData.name }); // Verifica se já existe um usuário com o mesmo nome
    if(existingUser){
        return null;
    }

    const newUser = userRepository.create(userData);
    return await userRepository.save(newUser);


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

const findById = async (id: number): Promise<IUser | null> => {
    const user = await userRepository.findOneBy({ id });
    return user; // Retorna null se não encontrar o usuário
};





export default { getUsers, createUser, updateUser, deleteUser ,findById};