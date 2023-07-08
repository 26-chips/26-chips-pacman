import { Router } from 'express';
import { TopicAPI } from '../controllers';

export const topicRouter = (router: Router) => {
  const routes: Router = Router();

  routes.get('/', TopicAPI.getAll).post('/', TopicAPI.create);

  router.use('/topic', routes);
};
