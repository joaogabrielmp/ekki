import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '@modules/users/entities/User';
import AppError from '@shared/errors/AppError';

@injectable()
class UpdateUser {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(
    cellphone: string,
    cpf: string,
    name: string,
    user_id: string,
  ): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const checkCPFExists = await this.usersRepository.findByCPF(cpf);

    if (checkCPFExists) {
      throw new AppError('User already registered');
    }

    Object.assign(user, { cellphone, cpf, name });

    return this.usersRepository.update(user);
  }
}

export default UpdateUser;
