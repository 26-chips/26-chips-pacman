import { Router } from 'express';
import { TopicAPI } from '../controllers';

export const topicRouter = (router: Router) => {
  const routes: Router = Router();

  routes
    .get('/comments', TopicAPI.getAllComments)
    .post('/', TopicAPI.create)
    .get('/', TopicAPI.getAll)
    .delete('/', TopicAPI.delete);

  router.use('/topic', routes);
};
