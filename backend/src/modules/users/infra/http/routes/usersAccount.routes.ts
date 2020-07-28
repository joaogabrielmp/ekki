import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import UsersAccountController from '@modules/users/infra/http/controllers/UsersAccountController';

const usersAccountRouter = Router();
const usersAccountController = new UsersAccountController();

usersAccountRouter.get(
  '/:user_id',
  celebrate({
    [Segments.PARAMS]: {
      user_id: Joi.string().uuid().required(),
    },
  }),
  usersAccountController.getById,
);

export default usersAccountRouter;
