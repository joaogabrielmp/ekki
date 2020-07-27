import 'express-async-errors';
// import 'reflect-metadata';
import { errors } from 'celebrate';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';

// import '@shared/infra/typeorm';
// import '@shared/container';
// import AppError from '@shared/errors/AppError';
// import routes from '@shared/infra/http/routes';

const app = express();

app.use(cors());
app.use(express.json());
// app.use(routes);
app.use(errors());

// app.use(
//   (err: Error, request: Request, response: Response, _next: NextFunction) => {
//     if (err instanceof AppError) {
//       return response.status(err.statusCode).json({
//         status: 'error',
//         message: err.message,
//       });
//     }

//     console.error(err);

//     return response.status(500).json({
//       status: 'error',
//       message: 'Internal server error',
//     });
//   },
// );

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});
