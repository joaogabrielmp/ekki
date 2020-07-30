import { getRepository, Repository } from 'typeorm';

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

  public async findAllByUser(
    page: number,
    per_page: number,
    id: string,
  ): Promise<UserBeneficiary[]> {
    const userBeneficiaries = await this.ormRepository.find({
      skip: per_page * page - per_page,
      take: per_page,
      where: { user_id: id },
    });

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
