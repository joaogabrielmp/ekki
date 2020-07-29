import { inject, injectable } from 'tsyringe';

import IUserBeneficiariesRepository from '@modules/users/repositories/IUserBeneficiariesRepository';

@injectable()
class DeleteBeneficiary {
  constructor(
    @inject('UserBeneficiariesRepository')
    private userBeneficiariesRepository: IUserBeneficiariesRepository,
  ) {}

  public async execute(beneficiary_id: string): Promise<string> {
    const isDeleted = await this.userBeneficiariesRepository.delete(
      beneficiary_id,
    );

    return isDeleted ? 'Beneficiary deleted' : 'Beneficiary not found';
  }
}

export default DeleteBeneficiary;
