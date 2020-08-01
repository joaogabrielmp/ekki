import { inject, injectable } from 'tsyringe';

import IFindAllBeneficiariesDTO from '@modules/users/dtos/IFindAllBeneficiariesDTO';
import IUserBeneficiariesRepository from '@modules/users/repositories/IUserBeneficiariesRepository';

import UserBeneficiary from '@modules/users/entities/UserBeneficiary';

@injectable()
class FindAllUserBeneficiary {
  constructor(
    @inject('UserBeneficiariesRepository')
    private userBeneficiariesRepository: IUserBeneficiariesRepository,
  ) {}

  public async execute({
    page,
    per_page,
    user_id,
  }: IFindAllBeneficiariesDTO): Promise<UserBeneficiary[]> {
    const userBeneficiaries = await this.userBeneficiariesRepository.findAllByUser(
      { page, per_page, user_id },
    );

    return userBeneficiaries;
  }
}

export default FindAllUserBeneficiary;
