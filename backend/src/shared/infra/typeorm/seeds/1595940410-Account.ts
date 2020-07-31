import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class Account implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into('accounts')
      .values([
        {
          id: 'a1cf74ef-a4dd-4919-9a71-c4934f69fe66',
          account_number: '1234561',
          balance: 10000,
        },
      ])
      .execute();
  }
}
