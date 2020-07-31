import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import userBeneficiariesRouter from '@modules/users/infra/http/routes/user.beneficiaries.routes';
import transfersRouter from '@modules/transfers/infra/http/routes/transfers.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/users/beneficiaries', userBeneficiariesRouter);
routes.use('/transfers', transfersRouter);

export default routes;
