import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import UsersController from '@modules/users/infra/http/controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get(
  '/:user_id',
  celebrate({
    [Segments.PARAMS]: {
      user_id: Joi.string().uuid().required(),
    },
  }),
  usersController.getById,
);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      cellphone: Joi.string().required(),
      cpf: Joi.string().length(11).required(),
      name: Joi.string().required(),
      user_id: Joi.string().uuid(),
    },
  }),
  usersController.create,
);

usersRouter.put(
  '/:user_id',
  celebrate({
    [Segments.PARAMS]: {
      user_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      cellphone: Joi.string(),
      cpf: Joi.string().length(11),
      name: Joi.string(),
    },
  }),
  usersController.update,
);

export default usersRouter;
