import { NextFunction, Request, Response } from 'express';

export const watchCookiesMW = async (
  _request: Request,
  _response: Response,
  next: NextFunction
): Promise<void> => {
  console.log('HELLO');
  console.log('REQUEST', _request?.cookies);
  console.log('REQUEST', _request?.headers?.cookie);
  next();
};
