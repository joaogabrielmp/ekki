import { inject, injectable } from 'tsyringe';

import IUserBeneficiariesRepository from '@modules/users/repositories/IUserBeneficiariesRepository';

import IUserBeneficiaryDTO from '@modules/users/dtos/IUserBeneficiaryDTO';

import UserBeneficiary from '@modules/users/entities/UserBeneficiary';
import AppError from '@shared/errors/AppError';

@injectable()
class CreateUser {
  constructor(
    @inject('UserBeneficiariesRepository')
    private userBeneficiariesRepository: IUserBeneficiariesRepository,
  ) {}

  public async execute({
    beneficiary_id,
    user_id,
  }: IUserBeneficiaryDTO): Promise<UserBeneficiary> {
    const checkBeneficiaryExists = await this.userBeneficiariesRepository.findByUserAndBeneficiary(
      {
        beneficiary_id,
        user_id,
      },
    );

    if (checkBeneficiaryExists) {
      throw new AppError('Beneficiary already registered');
    }

    const userBeneficiary = await this.userBeneficiariesRepository.create({
      beneficiary_id,
      user_id,
    });

    return userBeneficiary;
  }
}

export default CreateUser;
