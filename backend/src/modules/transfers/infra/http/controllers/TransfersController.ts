import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import FindAllTransfers from '@modules/transfers/services/FindAllTransfers';
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

    return response.sendStatus(201);
  }

  public async getAll(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;
    const page = Number(request.query.page);
    const per_page = Number(request.query.per_page);

    const findAllTransfers = container.resolve(FindAllTransfers);

    const transfers = await findAllTransfers.execute({
      page,
      per_page,
      user_id,
    });

    return response.json(classToClass(transfers));
  }
}
