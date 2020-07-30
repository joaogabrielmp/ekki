import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUser from '@modules/users/services/CreateUser';
import FindUserById from '@modules/users/services/FindUserById';
import UpdateUser from '@modules/users/services/UpdateUser';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { cellphone, cpf, name } = request.body;

    const createUser = container.resolve(CreateUser);

    const user = await createUser.execute({
      cellphone,
      cpf,
      name,
    });

    return response.json(classToClass(user));
  }

  public async getById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { user_id } = request.params;

    const findUserById = container.resolve(FindUserById);

    const user = await findUserById.execute({ user_id });

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;
    const { cellphone, cpf, name } = request.body;

    const updateUser = container.resolve(UpdateUser);

    const user = await updateUser.execute({ cellphone, cpf, name, user_id });

    return response.json(classToClass(user));
  }
}
