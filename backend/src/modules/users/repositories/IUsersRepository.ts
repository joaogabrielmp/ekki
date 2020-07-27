import User from '@modules/users/entities/User';

export default interface IUsersRepository {
  findByEmail(email: string): Promise<User | undefined>;
}
