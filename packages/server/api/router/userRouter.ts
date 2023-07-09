import { Router } from 'express';
import { UserAPI } from '../controllers';

export const userRouter = (router: Router) => {
  const routes: Router = Router();

  routes.get('/', UserAPI.get).post('/', UserAPI.create);

  router.use('/user', routes);
};
