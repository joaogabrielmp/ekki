import FakeUserBeneficiariesRepository from '@modules/users/repositories/fakes/FakeUserBeneficiariesRepository';
import FindAllUserBeneficiary from './FindAllUserBeneficiary';

let fakeUserBeneficiariesRepository: FakeUserBeneficiariesRepository;
let findAllUserBeneficiary: FindAllUserBeneficiary;

describe('FindAllUserBeneficiary', () => {
  beforeEach(() => {
    fakeUserBeneficiariesRepository = new FakeUserBeneficiariesRepository();
    findAllUserBeneficiary = new FindAllUserBeneficiary(
      fakeUserBeneficiariesRepository,
    );
  });

  it('should be able to find beneficiaries by user id', async () => {
    const beneficiary_id = '11dfae66-8495-4bd5-ad76-79f1d26f5f23';
    const user_id = 'cf41da34-a7c3-4c68-b79f-a42740aaec04';
    const page = 1;
    const per_page = 10;

    await fakeUserBeneficiariesRepository.create({
      beneficiary_id,
      user_id: 'cf41da34-a7c3-4c68-b79f-a42740aaec04',
    });

    const userBeneficiaries = await findAllUserBeneficiary.execute(
      page,
      per_page,
      user_id,
    );

    expect(userBeneficiaries).toMatchObject([
      {
        id: 'a756ea69-5103-463f-8946-84e00e8e66e4',
        beneficiary_id: '11dfae66-8495-4bd5-ad76-79f1d26f5f23',
        user_id: 'cf41da34-a7c3-4c68-b79f-a42740aaec04',
      },
    ]);
  });
});
