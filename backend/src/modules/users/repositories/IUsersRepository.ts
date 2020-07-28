import User from '@modules/users/entities/User';

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
}
