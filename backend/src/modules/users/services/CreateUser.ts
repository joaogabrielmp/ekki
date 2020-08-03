import { inject, injectable } from 'tsyringe';

import IUserDTO from '@modules/users/dtos/IUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '@modules/users/entities/User';
import AppError from '@shared/errors/AppError';

@injectable()
class CreateUser {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    cellphone,
    cpf,
    name,
    user_id,
  }: IUserDTO): Promise<User> {
    const checkUserExists = await this.usersRepository.findByCPF(cpf);

    if (checkUserExists) {
      throw new AppError('User already registered');
    }

    const user = await this.usersRepository.create({
      cellphone,
      cpf,
      name,
      user_id,
    });

    return user;
  }
}

export default CreateUser;
