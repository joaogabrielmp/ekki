import { container } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserBeneficiariesRepository from '@modules/users/repositories/IUserBeneficiariesRepository';
import UserBeneficiariesRepository from '@modules/users/infra/typeorm/repositories/UserBeneficiariesRepository';

import ITransfersRepository from '@modules/transfers/repositories/ITransfersRepository';
import TransfersRepository from '@modules/transfers/infra/repositories/TransfersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserBeneficiariesRepository>(
  'UserBeneficiariesRepository',
  UserBeneficiariesRepository,
);

container.registerSingleton<ITransfersRepository>(
  'TransfersRepository',
  TransfersRepository,
);
