import { inject, injectable } from 'tsyringe';

import IFindAllBeneficiariesDTO from '@modules/users/dtos/IFindAllBeneficiariesDTO';
import IUserBeneficiariesRepository from '@modules/users/repositories/IUserBeneficiariesRepository';

import UserBeneficiary from '@modules/users/entities/UserBeneficiary';

interface ITotal {
  total: number;
}

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
  }: IFindAllBeneficiariesDTO): Promise<
    ITotal | UserBeneficiary[] | undefined
  > {
    const total = await this.userBeneficiariesRepository.findAllAndCountById(
      user_id,
    );

    const userBeneficiaries = await this.userBeneficiariesRepository.findAllByUser(
      { page, per_page, user_id },
    );

    const userBeneficiariesAndTotal = { total, userBeneficiaries };

    return userBeneficiariesAndTotal;
  }
}

export default FindAllUserBeneficiary;
