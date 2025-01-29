import { NextFunction, Request, Response } from 'express';
import { constants } from 'http2';
import { ZodError, ZodSchema } from 'zod';

export const bodyValidate =
  <T>(schema: ZodSchema<T>) =>
  // eslint-disable-next-line consistent-return
  (req: Request, res: Response, next: NextFunction): unknown => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
          message: 'Validation error',
          errors: error.errors.map(err => ({
            path: err.path.join('.'),
            message: err.message,
          })),
        });
      }
      next(error);
    }
  };
