import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class User implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into('users')
      .values([
        {
          id: 'cf41da34-a7c3-4c68-b79f-a42740aaec04',
          name: 'John Doe',
          cpf: '43271533032',
          cellphone: '37991918282',
          account_id: 'a1cf74ef-a4dd-4919-9a71-c4934f69fe66',
        },
      ])
      .execute();
  }
}
