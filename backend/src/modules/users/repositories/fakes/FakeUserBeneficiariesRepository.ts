import IFindAllBeneficiariesDTO from '@modules/users/dtos/IFindAllBeneficiariesDTO';
import IUserBeneficiaryDTO from '@modules/users/dtos/IUserBeneficiaryDTO';
import IUserBeneficiariesRepository from '@modules/users/repositories/IUserBeneficiariesRepository';

import UserBeneficiary from '@modules/users/entities/UserBeneficiary';

class FakeUserBeneficiariesRepository implements IUserBeneficiariesRepository {
  private userBeneficiaries: UserBeneficiary[] = [];

  public async create({
    beneficiary_id,
    user_id,
  }: IUserBeneficiaryDTO): Promise<UserBeneficiary> {
    const userBeneficiary = new UserBeneficiary();

    Object.assign(userBeneficiary, {
      id: 'a756ea69-5103-463f-8946-84e00e8e66e4',
      beneficiary_id,
      user_id,
    });

    this.userBeneficiaries.push(userBeneficiary);

    return userBeneficiary;
  }

  public async delete(id: string): Promise<boolean> {
    let { userBeneficiaries } = this;

    userBeneficiaries = this.userBeneficiaries.filter(userBeneficiary => {
      return userBeneficiary.beneficiary_id !== id;
    });

    const isDeleted = userBeneficiaries?.length === 0;

    return isDeleted;
  }

  public async findAllByUser({
    page,
    per_page,
    user_id,
  }: IFindAllBeneficiariesDTO): Promise<UserBeneficiary[]> {
    let { userBeneficiaries } = this;

    userBeneficiaries = this.userBeneficiaries
      .slice(page - 1, per_page)
      .filter(userBeneficiary => userBeneficiary.user_id === user_id);

    return userBeneficiaries;
  }

  public async findByUserAndBeneficiary({
    beneficiary_id,
    user_id,
  }: IUserBeneficiaryDTO): Promise<UserBeneficiary | undefined> {
    const findUserBeneficiaries = this.userBeneficiaries.find(
      userBeneficiary =>
        userBeneficiary.beneficiary_id === beneficiary_id &&
        userBeneficiary.user_id === user_id,
    );

    return findUserBeneficiaries;
  }
}

export default FakeUserBeneficiariesRepository;
