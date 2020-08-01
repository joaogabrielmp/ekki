import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserBeneficiary from '@modules/users/services/CreateUserBeneficiary';
import DeleteBeneficiary from '@modules/users/services/DeleteBeneficiary';
import FindAllUserBeneficiary from '@modules/users/services/FindAllUserBeneficiary';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { beneficiary_id, user_id } = request.body;

    const createUserBeneficiary = container.resolve(CreateUserBeneficiary);

    await createUserBeneficiary.execute({
      beneficiary_id,
      user_id,
    });

    return response.sendStatus(201);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { beneficiary_id } = request.params;

    const deleteBeneficiary = container.resolve(DeleteBeneficiary);

    const message = await deleteBeneficiary.execute(beneficiary_id);

    return response.json({ message });
  }

  public async getAll(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;
    const page = Number(request.query.page);
    const per_page = Number(request.query.per_page);

    const findAllUserBeneficiary = container.resolve(FindAllUserBeneficiary);

    const userBeneficiary = await findAllUserBeneficiary.execute(
      page,
      per_page,
      user_id,
    );

    return response.json(classToClass(userBeneficiary));
  }
}
