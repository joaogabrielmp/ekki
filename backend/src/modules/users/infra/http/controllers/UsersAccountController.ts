import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import FindUserAccountById from '@modules/users/services/FindUserAccountById';

export default class UsersAccountController {
  public async getById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { user_id } = request.params;

    const findUserAccountById = container.resolve(FindUserAccountById);

    const userAccount = await findUserAccountById.execute({ user_id });

    return response.json(classToClass(userAccount));
  }
}
