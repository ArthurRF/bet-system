import { NextFunction, Request, Response } from 'express';
import { constants } from 'http2';
import { z } from 'zod';
import { bodyValidate } from '../body-validate.middleware';

describe('bodyValidate', () => {
  const mockNext: NextFunction = jest.fn();
  const mockResponse: Response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call next() when validation succeeds', async () => {
    const schema = z.object({ name: z.string() });
    const mockRequest: Request = {
      body: { name: 'John Doe' },
    } as any;

    await bodyValidate(schema)(mockRequest, mockResponse, mockNext);

    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockResponse.json).not.toHaveBeenCalled();
  });

  test('should return 400 with validation errors when validation fails', async () => {
    const schema = z.object({ name: z.string() });
    const mockRequest: Request = {
      body: { age: 30 },
    } as any;

    await bodyValidate(schema)(mockRequest, mockResponse, mockNext);

    expect(mockNext).not.toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(
      constants.HTTP_STATUS_BAD_REQUEST
    );
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Validation error',
        errors: expect.any(Array),
      })
    );
  });

  test('should call next() with error when it is not a ZodError', async () => {
    const schema = z.object({ name: z.string() });
    const mockRequest: Request = {
      body: { name: 'John Doe' },
    } as any;

    jest.spyOn(schema, 'parse').mockImplementationOnce(() => {
      throw new Error('Mocked non-ZodError');
    });

    await bodyValidate(schema)(mockRequest, mockResponse, mockNext);

    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockResponse.json).not.toHaveBeenCalled();
  });
});
