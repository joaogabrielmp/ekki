import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import TransfersController from '@modules/transfers/infra/http/controllers/TransfersController';

const transfersRouter = Router();
const transfersController = new TransfersController();

transfersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      balance: Joi.number().min(1).required(),
      beneficiary_id: Joi.string().uuid().required(),
      user_id: Joi.string().uuid().required(),
    },
  }),
  transfersController.create,
);

export default transfersRouter;
