import { Request, Response } from 'express';
import { container } from 'tsyringe';

import TransferMoney from '@modules/transfers/services/TransferMoney';

export default class TransfersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      receive_account_number,
      receive_user_id,
      send_account_number,
      send_user_id,
      value,
    } = request.body;

    const createTransferMoney = container.resolve(TransferMoney);

    await createTransferMoney.execute({
      receive_account_number,
      receive_user_id,
      send_account_number,
      send_user_id,
      value,
    });

    return response.sendStatus(200);
  }
}
