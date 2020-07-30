import { inject, injectable } from 'tsyringe';

import IUserBeneficiariesRepository from '@modules/users/repositories/IUserBeneficiariesRepository';

import UserBeneficiary from '@modules/users/entities/UserBeneficiary';

@injectable()
class FindAllUserBeneficiary {
  constructor(
    @inject('UserBeneficiariesRepository')
    private userBeneficiariesRepository: IUserBeneficiariesRepository,
  ) {}

  public async execute(
    page: number,
    per_page: number,
    id: string,
  ): Promise<UserBeneficiary[]> {
    const userBeneficiaries = await this.userBeneficiariesRepository.findAllByUser(
      page,
      per_page,
      id,
    );

    return userBeneficiaries;
  }
}

export default FindAllUserBeneficiary;
