import UserBeneficiary from '@modules/users/entities/UserBeneficiary';
import ICreateUserBeneficiaryDTO from '@modules/users/dtos/ICreateUserBeneficiaryDTO';

export default interface IUserBeneficiariesRepository {
  create(data: ICreateUserBeneficiaryDTO): Promise<UserBeneficiary>;
  findAll(id: string): Promise<UserBeneficiary[]>;
  findById(id: string): Promise<UserBeneficiary | undefined>;
  save(userBeneficiary: UserBeneficiary): Promise<UserBeneficiary>;
}
