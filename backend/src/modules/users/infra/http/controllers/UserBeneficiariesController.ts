import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserBeneficiary from '@modules/users/services/CreateUserBeneficiary';

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
}
