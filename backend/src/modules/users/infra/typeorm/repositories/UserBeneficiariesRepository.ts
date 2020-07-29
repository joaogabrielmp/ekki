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

  public async findAllByUser(id: string): Promise<UserBeneficiary[]> {
    const userBeneficiaries = await this.ormRepository.find({ user_id: id });

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

  public async save(
    userBeneficiary: UserBeneficiary,
  ): Promise<UserBeneficiary> {
    return this.ormRepository.save(userBeneficiary);
  }
}

export default UserBeneficiariesRepository;
