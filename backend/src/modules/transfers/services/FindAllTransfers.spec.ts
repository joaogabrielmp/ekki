import TransferStatus from '@modules/transfers/enums/TransferStatus';
import FakeTransfersRepository from '@modules/transfers/repositories/fakes/FakeTransfersRepository';
import FindAllTransfers from './FindAllTransfers';

let fakeTransfersRepository: FakeTransfersRepository;
let findAllTransfers: FindAllTransfers;

describe('FindAllTransfers', () => {
  beforeEach(() => {
    fakeTransfersRepository = new FakeTransfersRepository();
    findAllTransfers = new FindAllTransfers(fakeTransfersRepository);
  });

  it('should be able to find transfers by user id', async () => {
    const debitAcccount = true;
    const receive_account_number = '112233';
    const receive_user_id = '1437216b-57ea-4dec-a1aa-12448c897e3b';
    const send_account_number = '445566';
    const user_id = 'beec37e5-bb27-40d3-a1e0-c02faa9252d7';
    const status = TransferStatus.Approved;
    const value = 1100;
    const page = 1;
    const per_page = 10;

    await fakeTransfersRepository.processTransfer({
      debitAcccount,
      receive_account_number,
      receive_user_id,
      send_account_number,
      send_user_id: user_id,
      status,
      value,
    });

    const transfers = await findAllTransfers.execute({
      page,
      per_page,
      user_id,
    });

    expect(transfers).toMatchObject([
      {
        id: 'a756ea69-5103-463f-8946-84e00e8e66e4',
        balance: 1100,
        receive_user_id: '1437216b-57ea-4dec-a1aa-12448c897e3b',
        send_user_id: 'beec37e5-bb27-40d3-a1e0-c02faa9252d7',
        status,
        value,
      },
    ]);
  });
});
