import IUserBeneficiaryDTO from '@modules/users/dtos/IUserBeneficiaryDTO';
import UserBeneficiary from '@modules/users/entities/UserBeneficiary';

export default interface IUserBeneficiariesRepository {
  create(data: IUserBeneficiaryDTO): Promise<UserBeneficiary>;
  delete(id: string): Promise<boolean>;
  findAllByUser(
    page: number,
    per_page: number,
    id: string,
  ): Promise<UserBeneficiary[]>;
  findByUserAndBeneficiary(
    data: IUserBeneficiaryDTO,
  ): Promise<UserBeneficiary | undefined>;
}
