import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserBeneficiary from '@modules/users/services/CreateUserBeneficiary';
import FindAllUserBeneficiary from '@modules/users/services/FindAllUserBeneficiary';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { beneficiary_id, user_id } = request.body;

    const createUserBeneficiary = container.resolve(CreateUserBeneficiary);

    const userBeneficiary = await createUserBeneficiary.execute({
      beneficiary_id,
      user_id,
    });

    return response.json(classToClass(userBeneficiary));
  }

  public async findAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { user_id } = request.params;

    const findAllUserBeneficiary = container.resolve(FindAllUserBeneficiary);

    const userBeneficiary = await findAllUserBeneficiary.execute(user_id);

    return response.json(classToClass(userBeneficiary));
  }
}
