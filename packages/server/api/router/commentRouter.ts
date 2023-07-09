import { Router } from 'express';
import { CommentAPI } from '../controllers';

export const commentRouter = (router: Router) => {
  const routes: Router = Router();

  routes.post('/', CommentAPI.create);

  router.use('/comment', routes);
};
