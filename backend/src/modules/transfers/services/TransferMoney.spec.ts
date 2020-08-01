import AppError from '@shared/errors/AppError';

import FakeTransfersRepository from '@modules/transfers/repositories/fakes/FakeTransfersRepository';
import TransferStatus from '@modules/transfers/enums/TransferStatus';

import TransferMoney from './TransferMoney';

let fakeTransfersRepository: FakeTransfersRepository;
let transferMoney: TransferMoney;

jest.mock('date-fns', () => ({
  differenceInSeconds: jest.fn(() => 0),
  subHours: jest.fn(() => 3),
}));

describe('CreateUserBeneficiary', () => {
  beforeEach(() => {
    fakeTransfersRepository = new FakeTransfersRepository();
    transferMoney = new TransferMoney(fakeTransfersRepository);
  });

  it('should be able to make a transfer', async () => {
    const debitAcccount = true;
    const receive_account_number = '112233';
    const receive_user_id = '1437216b-57ea-4dec-a1aa-12448c897e3b';
    const send_account_number = '445566';
    const send_user_id = 'beec37e5-bb27-40d3-a1e0-c02faa9252d7';
    const value = 100;

    const transfer = await transferMoney.execute({
      debitAcccount,
      receive_account_number,
      receive_user_id,
      send_account_number,
      send_user_id,
      value,
    });

    expect(transfer).toMatchObject({
      balance: 100,
      id: 'a756ea69-5103-463f-8946-84e00e8e66e4',
      receive_user_id: '1437216b-57ea-4dec-a1aa-12448c897e3b',
      send_user_id: 'beec37e5-bb27-40d3-a1e0-c02faa9252d7',
      status: TransferStatus.Approved,
      value: 100,
    });
  });

  it('should not be able to make a transfer with invalid account', async () => {
    await expect(
      transferMoney.execute({
        debitAcccount: true,
        receive_account_number: 'account_number',
        receive_user_id: 'id',
        send_account_number: 'non-existing-account-number',
        send_user_id: 'id',
        value: 100,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to make a transfer using limit', async () => {
    const debitAcccount = true;
    const receive_account_number = '112233';
    const receive_user_id = '1437216b-57ea-4dec-a1aa-12448c897e3b';
    const send_account_number = '445566';
    const send_user_id = 'beec37e5-bb27-40d3-a1e0-c02faa9252d7';
    const value = 1100;

    const transfer = await transferMoney.execute({
      debitAcccount,
      receive_account_number,
      receive_user_id,
      send_account_number,
      send_user_id,
      value,
    });

    expect(transfer).toMatchObject({
      balance: 1100,
      id: 'a756ea69-5103-463f-8946-84e00e8e66e4',
      receive_user_id: '1437216b-57ea-4dec-a1aa-12448c897e3b',
      send_user_id: 'beec37e5-bb27-40d3-a1e0-c02faa9252d7',
      status: TransferStatus.Approved,
      value: 1100,
    });
  });

  it('should not be able to make a transfer with amount greater than the balance and limit', async () => {
    const debitAcccount = true;
    const receive_account_number = '112233';
    const receive_user_id = '1437216b-57ea-4dec-a1aa-12448c897e3b';
    const send_account_number = '445566';
    const send_user_id = 'beec37e5-bb27-40d3-a1e0-c02faa9252d7';
    const value = 1600;

    await expect(
      transferMoney.execute({
        debitAcccount,
        receive_account_number,
        receive_user_id,
        send_account_number,
        send_user_id,
        value,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to cancel an old transfer when the time is less than two minutes', async () => {
    const debitAcccount = true;
    const receive_account_number = '112233';
    const receive_user_id = '1437216b-57ea-4dec-a1aa-12448c897e3b';
    const send_account_number = '445566';
    const send_user_id = 'beec37e5-bb27-40d3-a1e0-c02faa9252d7';
    const value = 1100;

    const transfer = await transferMoney.execute({
      debitAcccount,
      receive_account_number,
      receive_user_id,
      send_account_number,
      send_user_id,
      value,
    });

    expect(transfer).toMatchObject({
      balance: 1100,
      id: 'a756ea69-5103-463f-8946-84e00e8e66e4',
      receive_user_id: '1437216b-57ea-4dec-a1aa-12448c897e3b',
      send_user_id: 'beec37e5-bb27-40d3-a1e0-c02faa9252d7',
      status: TransferStatus.Approved,
      value: 1100,
    });
  });
});
