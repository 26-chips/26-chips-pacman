import { Request, Response } from 'express';
import { topicService } from '../services';

export class TopicAPI {
  public static getAll = async (_req: Request, res: Response) => {
    try {
      const topics = await topicService.findAll();

      res.json(topics);
    } catch (e) {
      res.status(404);
      res.json({ error: (e as Error).message });
    }
  };

  public static create = async (req: Request, res: Response) => {
    const { body } = req;

    try {
      topicService.create(body);
      res.json({ message: 'Topic created' });
    } catch (e) {
      res.status(400);
      res.json({ error: (e as Error).message });
    }
  };
}
