import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

import InitialUser from '../seeds/InitialUser';

export default class CreateSeedInitialUser1595892089895
  implements MigrationInterface {
  public async up(_: QueryRunner): Promise<void> {
    const initialUser = InitialUser;
    await getRepository('users').save(initialUser);
  }

  public async down(_: QueryRunner): Promise<void> {
    //
  }
}
