import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import UserBeneficiariesController from '@modules/users/infra/http/controllers/UserBeneficiariesController';

const userBeneficiariesRouter = Router();
const userBeneficiariesController = new UserBeneficiariesController();

userBeneficiariesRouter.delete(
  '/:beneficiary_id',
  celebrate({
    [Segments.PARAMS]: {
      beneficiary_id: Joi.string().uuid().required(),
    },
  }),
  userBeneficiariesController.delete,
);

userBeneficiariesRouter.get(
  '/:user_id',
  celebrate({
    [Segments.PARAMS]: {
      user_id: Joi.string().uuid().required(),
    },
    [Segments.QUERY]: {
      page: Joi.number().min(1).required(),
      per_page: Joi.number().required(),
    },
  }),
  userBeneficiariesController.findAllByUser,
);

userBeneficiariesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      beneficiary_id: Joi.string().uuid().required(),
      user_id: Joi.string().uuid().required(),
    },
  }),
  userBeneficiariesController.create,
);

export default userBeneficiariesRouter;
