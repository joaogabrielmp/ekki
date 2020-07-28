import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import FindUserById from '@modules/users/services/FindUserById';

export default class UsersController {
  public async getById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { user_id } = request.params;

    const findUserById = container.resolve(FindUserById);

    const user = await findUserById.execute({ user_id });

    return response.json(classToClass(user));
  }
}
