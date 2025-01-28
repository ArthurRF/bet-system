import 'dotenv/config';
import 'reflect-metadata';

import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import helmet from 'helmet';

import { AppError } from '@shared/errors/app.error';
import routes from './routes';

const app = express();

app.use(helmet());

app.use(
  express.urlencoded({ limit: '10mb', extended: false, parameterLimit: 50000 })
);
app.use(express.json({ limit: '10mb' }));
app.disable('x-powered-by');

app.use(cors());
app.use(routes);

process.on('SIGTERM', () => {
  process.exit(0);
});

app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
        type: 'app',
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error - not treated',
      type: 'unknown',
    });
  }
);

export default app;
