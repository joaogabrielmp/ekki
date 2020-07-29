import IUserBeneficiaryDTO from '@modules/users/dtos/IUserBeneficiaryDTO';
import UserBeneficiary from '@modules/users/entities/UserBeneficiary';

export default interface IUserBeneficiariesRepository {
  create(data: IUserBeneficiaryDTO): Promise<UserBeneficiary>;
  delete(id: string): Promise<boolean>;
  findAllByUser(id: string): Promise<UserBeneficiary[]>;
  findByUserAndBeneficiary(
    data: IUserBeneficiaryDTO,
  ): Promise<UserBeneficiary | undefined>;
  save(userBeneficiary: UserBeneficiary): Promise<UserBeneficiary>;
}
