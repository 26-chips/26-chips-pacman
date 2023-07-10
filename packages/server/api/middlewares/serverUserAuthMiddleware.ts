import { NextFunction, Request, Response } from 'express';
// import axios from 'axios';

// const PRAKTIKUM_AUTH_ENDPOINT = 'https://ya-praktikum.tech/api/v2/auth/user';

export const serverUserAuthMiddleware = async (
  request: Request,
  _response: Response,
  next: NextFunction
): Promise<void> => {
  console.log('REQUEST', request?.cookies);
  console.log('REQUEST', request?.headers?.cookie);
  next();
};

export const helloMiddleware = async (
  _request: Request,
  _response: Response,
  next: NextFunction
): Promise<void> => {
  console.log('HELLO');
  next();
};
