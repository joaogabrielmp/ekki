import { inject, injectable } from 'tsyringe';

import IUserBeneficiariesRepository from '@modules/users/repositories/IUserBeneficiariesRepository';

import UserBeneficiary from '@modules/users/entities/UserBeneficiary';

@injectable()
class FindAllUserBeneficiary {
  constructor(
    @inject('UserBeneficiariesRepository')
    private userBeneficiariesRepository: IUserBeneficiariesRepository,
  ) {}

  public async execute(id: string): Promise<UserBeneficiary[]> {
    const userBeneficiaries = await this.userBeneficiariesRepository.findAllByUser(
      id,
    );

    return userBeneficiaries;
  }
}

export default FindAllUserBeneficiary;
