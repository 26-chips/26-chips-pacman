import { BaseRESTService } from './BaseRESTService';
import { Topic, CreateTopicType, Comment, User } from '../models';

export class TopicService implements BaseRESTService {
  public findAllComments = async (id: number) => {
    const messages = await Comment.findAll({
      where: {
        topicId: id,
      },
      attributes: { exclude: ['authorId', 'topicId'] },
      include: [
        {
          model: User,
          attributes: { exclude: [] },
        },
      ],
    });

    const users = messages.map(message => message.user);
    const uniqueUsers = Array.from(new Set(users));

    return {
      messages,
      users: uniqueUsers,
    };
  };

  public findAll = () => {
    return Topic.findAll({
      attributes: ['id', 'title'],
    });
  };

  public create = (data: CreateTopicType) => {
    return Topic.create(data);
  };

  public delete = async (id: number) => {
    await Comment.destroy({
      where: {
        topicId: id,
      },
    });
    return Topic.destroy({
      where: {
        id: id,
      },
    });
  };
}

export const topicService = new TopicService();
