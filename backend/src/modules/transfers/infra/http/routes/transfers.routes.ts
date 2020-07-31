import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import TransfersController from '@modules/transfers/infra/http/controllers/TransfersController';

const transfersRouter = Router();
const transfersController = new TransfersController();

transfersRouter.post(
  '/',
  celebrate(
    {
      [Segments.BODY]: {
        receive_account_number: Joi.string().required(),
        receive_user_id: Joi.string().uuid().required(),
        send_account_number: Joi.string().required(),
        send_user_id: Joi.string().uuid().required(),
        value: Joi.number().min(1).precision(2).required(),
      },
    },
    { convert: false },
  ),
  transfersController.create,
);

export default transfersRouter;
