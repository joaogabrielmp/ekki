import { Request, Response } from 'express';
import { container } from 'tsyringe';

import TransferMoney from '@modules/transfers/services/TransferMoney';

export default class TransfersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { balance, beneficiary_id, user_id } = request.body;

    const createTransferMoney = container.resolve(TransferMoney);

    await createTransferMoney.execute({
      balance,
      beneficiary_id,
      user_id,
    });

    return response.sendStatus(200);
  }
}
