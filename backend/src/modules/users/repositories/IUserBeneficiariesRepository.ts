import IFindAllBeneficiariesDTO from '@modules/users/dtos/IFindAllBeneficiariesDTO';
import IUserBeneficiaryDTO from '@modules/users/dtos/IUserBeneficiaryDTO';
import UserBeneficiary from '@modules/users/entities/UserBeneficiary';

export default interface IUserBeneficiariesRepository {
  create(data: IUserBeneficiaryDTO): Promise<UserBeneficiary>;
  delete(id: string): Promise<boolean>;
  findAllAndCountById(user_id: string): Promise<number>;
  findAllByUser(data: IFindAllBeneficiariesDTO): Promise<UserBeneficiary[]>;
  findByUserAndBeneficiary(
    data: IUserBeneficiaryDTO,
  ): Promise<UserBeneficiary | undefined>;
}
