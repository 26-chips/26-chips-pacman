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

// const isAuthUser = (res: Response) => {
//   if (res.locals.user !== undefined && res.locals.user !== null) return true;
//   return false;
// };

// export const isAuthMiddleware = (
//   _req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (isAuthUser(res)) {
//     next();
//   } else {
//     res.status(401).send('not authorized');
//   }
// };

// export const proxyAuth = (
//   _req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (isAuthUser(res)) {
//     next();
//   } else {
//     res.status(401).send('not authorized');
//   }
// };
