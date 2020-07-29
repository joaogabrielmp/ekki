import UserBeneficiary from '@modules/users/entities/UserBeneficiary';
import IUserBeneficiaryDTO from '@modules/users/dtos/IUserBeneficiaryDTO';

export default interface IUserBeneficiariesRepository {
  create(data: IUserBeneficiaryDTO): Promise<UserBeneficiary>;
  findAllByUser(id: string): Promise<UserBeneficiary[]>;
  findByUserAndBeneficiary(
    data: IUserBeneficiaryDTO,
  ): Promise<UserBeneficiary | undefined>;
  save(userBeneficiary: UserBeneficiary): Promise<UserBeneficiary>;
  update(id: string): Promise<UserBeneficiary[]>;
}
