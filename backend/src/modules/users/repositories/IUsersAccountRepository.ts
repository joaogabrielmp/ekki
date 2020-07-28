import UserAccount from '@modules/users/entities/UserAccount';

export default interface IUsersAccountRepository {
  findById(id: string): Promise<UserAccount | undefined>;
}
