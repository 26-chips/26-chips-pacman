import { BaseRESTService } from './BaseRESTService';
import { User, CreateUserType } from '../models/user';

export class UserService implements BaseRESTService {
  // Emotion: ModelCtor<Model<any, any>>;

  public find = ({ id }: { id: number }) => {
    return User.findByPk(id);
  };

  public create = (data: CreateUserType) => {
    return User.create(data);
  };
}

export const userService = new UserService();
