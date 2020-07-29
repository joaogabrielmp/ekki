import { container, inject, injectable } from 'tsyringe';

import IUserDTO from '@modules/users/dtos/IUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import CreateAccount from '@modules/accounts/services/CreateAccount';
import User from '@modules/users/entities/User';
import AppError from '@shared/errors/AppError';

@injectable()
class CreateUser {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ cellphone, cpf, name }: IUserDTO): Promise<User> {
    const checkUserExists = await this.usersRepository.findByCPF(cpf);

    if (checkUserExists) {
      throw new AppError('User already registered');
    }

    const createAccount = container.resolve(CreateAccount);

    const { id } = await createAccount.execute();

    const userBeneficiary = await this.usersRepository.create({
      account_id: id,
      cellphone,
      cpf,
      name,
    });

    return userBeneficiary;
  }
}

export default CreateUser;
