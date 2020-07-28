import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';

const User = [
  {
    name: 'John Doe',
    cpf: '43271533032',
    cellphone: '37991918282',
  },
];

export default class InitialUser implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into('users')
      .values(User)
      .execute();
  }
}
