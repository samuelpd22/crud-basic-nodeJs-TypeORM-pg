import User from "../entities/User";
import IUser from "../interfaces/IUser";
import { AppDataSource } from "../../db/data-source";
import bcrypt from 'bcrypt';

const userRepository = AppDataSource.getRepository(User);

const getUsers = (): Promise<IUser[]> => {
    return userRepository.find();
}

const createUser = async (userData: IUser): Promise<IUser> => {
    
    const userExist = await userRepository.findOne({ where: { email: userData.email } });
    if (userExist) {
      throw new Error('Email já cadastrado!');
      console.log(' Error :Email já cadastrado!')
    }
    const hashPassword = await bcrypt.hash(userData.password,10)

    const user = userRepository.create({
      name: userData.name,
      email: userData.email,
      password: hashPassword});
      
    return await userRepository.save(user);
  };

  const findOneBy = async (filter: Partial<IUser>): Promise<IUser | null> => {
    return await userRepository.findOne({ where: filter });
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



export default { getUsers, createUser, updateUser, deleteUser ,findOneBy};