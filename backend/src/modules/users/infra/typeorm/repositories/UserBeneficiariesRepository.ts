import { getRepository, Repository } from 'typeorm';

import IFindAllBeneficiariesDTO from '@modules/users/dtos/IFindAllBeneficiariesDTO';
import IUserBeneficiariesRepository from '@modules/users/repositories/IUserBeneficiariesRepository';
import IUserBeneficiaryDTO from '@modules/users/dtos/IUserBeneficiaryDTO';

import UserBeneficiary from '@modules/users/entities/UserBeneficiary';

class UserBeneficiariesRepository implements IUserBeneficiariesRepository {
  private ormRepository: Repository<UserBeneficiary>;

  constructor() {
    this.ormRepository = getRepository(UserBeneficiary);
  }

  public async create(data: IUserBeneficiaryDTO): Promise<UserBeneficiary> {
    const userBeneficiary = this.ormRepository.create(data);

    await this.ormRepository.save(userBeneficiary);

    return userBeneficiary;
  }

  public async delete(id: string): Promise<boolean> {
    const userBeneficiary = await this.ormRepository.delete({
      beneficiary_id: id,
    });

    const isDeleted = !!userBeneficiary.affected;

    return isDeleted;
  }

  public async findAllAndCountById(user_id: string): Promise<number> {
    const totalBeneficiaries = await this.ormRepository.count({
      user_id,
    });

    return totalBeneficiaries;
  }

  public async findAllByUser({
    page,
    per_page,
    user_id,
  }: IFindAllBeneficiariesDTO): Promise<UserBeneficiary[]> {
    const userBeneficiaries = await this.ormRepository.manager.query(
      `
        select
        ub.beneficiary_id,
        u.account_id,
        u.cellphone,
        u.cpf,
        u.name,
        a.account_number,
        a.balance,
        a.limit
        from user_beneficiaries ub
        inner join users u on ub.beneficiary_id = u.id
        inner join accounts a on a.id = u.account_id
        where ub.user_id = '${user_id}'
        limit ${per_page} offset ${per_page * page - per_page}
      `,
    );

    return userBeneficiaries;
  }

  public async findByUserAndBeneficiary({
    beneficiary_id,
    user_id,
  }: IUserBeneficiaryDTO): Promise<UserBeneficiary | undefined> {
    const userBeneficiary = await this.ormRepository.findOne({
      beneficiary_id,
      user_id,
    });

    return userBeneficiary;
  }
}

export default UserBeneficiariesRepository;
