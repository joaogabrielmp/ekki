import { inject, injectable } from 'tsyringe';

import IUsersAccountRepository from '@modules/users/repositories/IUsersAccountRepository';

import UserAccount from '@modules/users/entities/UserAccount';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
}

@injectable()
class FindUserAccountById {
  constructor(
    @inject('UsersAccountRepository')
    private usersAccountRepository: IUsersAccountRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<UserAccount> {
    const userAccount = await this.usersAccountRepository.findById(user_id);

    if (!userAccount) {
      throw new AppError('User not found');
    }

    return userAccount;
  }
}

export default FindUserAccountById;
