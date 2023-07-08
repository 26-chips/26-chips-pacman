import { Request, Response } from 'express';
import { userService } from '../services/UserService';

export class UserAPI {
  public static get = async (req: Request, res: Response) => {
    const { query } = req;

    try {
      const { id } = query;
      const user = await userService.find({ id: Number(id) });

      if (user) {
        console.log(user.toJSON());
        res.json(user.toJSON());
      } else {
        res.json(null);
      }
    } catch (e) {
      res.status(404);
      res.json({ error: (e as Error).message });
    }
  };

  public static create = async (req: Request, res: Response) => {
    const { body } = req;

    try {
      userService.create(body);
      res.json({ message: 'User created' });
    } catch (e) {
      res.status(400);
      res.json({ error: (e as Error).message });
    }
  };
}
