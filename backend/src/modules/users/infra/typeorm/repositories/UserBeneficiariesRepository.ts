import { getRepository, Repository } from 'typeorm';

import IUserBeneficiariesRepository from '@modules/users/repositories/IUserBeneficiariesRepository';
import ICreateUserBeneficiaryDTO from '@modules/users/dtos/ICreateUserBeneficiaryDTO';

import UserBeneficiary from '@modules/users/entities/UserBeneficiary';

class UserBeneficiariesRepository implements IUserBeneficiariesRepository {
  private ormRepository: Repository<UserBeneficiary>;

  constructor() {
    this.ormRepository = getRepository(UserBeneficiary);
  }

  public async create(
    data: ICreateUserBeneficiaryDTO,
  ): Promise<UserBeneficiary> {
    const userBeneficiary = this.ormRepository.create(data);

    await this.ormRepository.save(userBeneficiary);

    return userBeneficiary;
  }

  public async findAll(id: string): Promise<UserBeneficiary[]> {
    const userBeneficiaries = await this.ormRepository.find({ id });

    return userBeneficiaries;
  }

  public async findById(id: string): Promise<UserBeneficiary | undefined> {
    const userBeneficiary = await this.ormRepository.findOne(id);

    return userBeneficiary;
  }

  public async save(
    userBeneficiary: UserBeneficiary,
  ): Promise<UserBeneficiary> {
    return this.ormRepository.save(userBeneficiary);
  }
}

export default UserBeneficiariesRepository;
