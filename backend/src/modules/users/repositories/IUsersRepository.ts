import IUserDTO from '@modules/users/dtos/IUserDTO';
import User from '@modules/users/entities/User';

export default interface IUsersRepository {
  create(data: IUserDTO): Promise<User>;
  findByCPF(cpf: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  update(user: User): Promise<User>;
}
