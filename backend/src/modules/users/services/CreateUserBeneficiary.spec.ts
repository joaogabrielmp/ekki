import AppError from '@shared/errors/AppError';

import FakeUserBeneficiariesRepository from '@modules/users/repositories/fakes/FakeUserBeneficiariesRepository';
import CreateUserBeneficiary from './CreateUserBeneficiary';

let fakeUserBeneficiariesRepository: FakeUserBeneficiariesRepository;
let createUserBeneficiary: CreateUserBeneficiary;

describe('CreateUserBeneficiary', () => {
  beforeEach(() => {
    fakeUserBeneficiariesRepository = new FakeUserBeneficiariesRepository();
    createUserBeneficiary = new CreateUserBeneficiary(
      fakeUserBeneficiariesRepository,
    );
  });

  it('should be able to create a new beneficiary', async () => {
    const beneficiary_id = '1437216b-57ea-4dec-a1aa-12448c897e3b';
    const user_id = 'beec37e5-bb27-40d3-a1e0-c02faa9252d7';

    const userBeneficiary = await createUserBeneficiary.execute({
      beneficiary_id,
      user_id,
    });

    expect(userBeneficiary.beneficiary_id).toBe(
      '1437216b-57ea-4dec-a1aa-12448c897e3b',
    );
    expect(userBeneficiary.user_id).toBe(
      'beec37e5-bb27-40d3-a1e0-c02faa9252d7',
    );
  });

  it('should not be able to create a new beneficiary when already registered', async () => {
    const beneficiary_id = 'ae0f86f5-4011-413d-83c6-3332b6c488d2';
    const user_id = '8974b5c3-ad20-48a6-9665-a8f56f4ea8c0';

    await createUserBeneficiary.execute({
      beneficiary_id,
      user_id,
    });

    await expect(
      createUserBeneficiary.execute({
        beneficiary_id: 'ae0f86f5-4011-413d-83c6-3332b6c488d2',
        user_id: '8974b5c3-ad20-48a6-9665-a8f56f4ea8c0',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
