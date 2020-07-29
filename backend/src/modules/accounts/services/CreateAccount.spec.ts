import FakeAccountsRepository from '@modules/accounts/repositories/fakes/FakeAccountsRepository';
import CreateAccount from './CreateAccount';

let fakeAccountsRepository: FakeAccountsRepository;
let createAccount: CreateAccount;

describe('CreateAccount', () => {
  beforeEach(() => {
    fakeAccountsRepository = new FakeAccountsRepository();
    createAccount = new CreateAccount(fakeAccountsRepository);
  });

  it('should be able to create account', async () => {
    const account = await createAccount.execute();

    expect(account.account_number).toBe('1234561');
    expect(account.balance).toBe(0);
  });

  // it('should be able to create account when to find existing account number', async () => {});
});
