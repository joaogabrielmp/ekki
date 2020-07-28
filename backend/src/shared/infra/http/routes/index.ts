import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import usersAccountRouter from '@modules/users/infra/http/routes/usersAccount.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/users/account', usersAccountRouter);

export default routes;
