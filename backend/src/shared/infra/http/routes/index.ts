import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import userBeneficiariesRouter from '@modules/users/infra/http/routes/user.beneficiaries.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/users/beneficiaries', userBeneficiariesRouter);

export default routes;
