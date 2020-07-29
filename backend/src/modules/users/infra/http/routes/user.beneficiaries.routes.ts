import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import UserBeneficiariesController from '@modules/users/infra/http/controllers/UserBeneficiariesController';

const userBeneficiariesRouter = Router();
const userBeneficiariesController = new UserBeneficiariesController();

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
