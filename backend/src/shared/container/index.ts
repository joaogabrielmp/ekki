import { container } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUsersAccountRepository from '@modules/users/repositories/IUsersAccountRepository';
import UsersAccountRepository from '@modules/users/infra/typeorm/repositories/UsersAccountRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUsersAccountRepository>(
  'UsersAccountRepository',
  UsersAccountRepository,
);
