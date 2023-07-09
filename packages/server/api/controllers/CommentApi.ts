import { Request, Response } from 'express';
import { commentService } from '../services';

export class CommentAPI {
  public static create = async (req: Request, res: Response) => {
    const { body } = req;

    try {
      commentService.create(body);
      res.json({ message: 'Comment created' });
    } catch (e) {
      res.status(400);
      res.json({ error: (e as Error).message });
    }
  };
}
