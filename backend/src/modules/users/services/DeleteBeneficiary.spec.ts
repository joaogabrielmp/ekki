import FakeUserBeneficiariesRepository from '@modules/users/repositories/fakes/FakeUserBeneficiariesRepository';
import DeleteBeneficiary from './DeleteBeneficiary';

let fakeUserBeneficiariesRepository: FakeUserBeneficiariesRepository;
let deleteBeneficiary: DeleteBeneficiary;

describe('DeleteBeneficiary', () => {
  beforeEach(() => {
    fakeUserBeneficiariesRepository = new FakeUserBeneficiariesRepository();
    deleteBeneficiary = new DeleteBeneficiary(fakeUserBeneficiariesRepository);
  });

  it('should be able to delete beneficiary by id', async () => {
    const beneficiary_id = '1437216b-57ea-4dec-a1aa-12448c897e3b';

    await fakeUserBeneficiariesRepository.create({
      beneficiary_id,
      user_id: 'cf41da34-a7c3-4c68-b79f-a42740aaec04',
    });

    const isDeleted = await deleteBeneficiary.execute(beneficiary_id);

    expect(isDeleted).toBe(true);
  });

  it('should not be able to delete beneficiary with invalid id', async () => {
    await fakeUserBeneficiariesRepository.create({
      beneficiary_id: '1437216b-57ea-4dec-a1aa-12448c897e3b',
      user_id: 'cf41da34-a7c3-4c68-b79f-a42740aaec04',
    });

    const isDeleted = await deleteBeneficiary.execute(
      'non-existing-beneficiary-id',
    );

    expect(isDeleted).toBe(false);
  });
});
