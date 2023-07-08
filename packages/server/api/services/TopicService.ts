import { BaseRESTService } from './BaseRESTService';
import { Topic, CreateTopicType } from '../models';

export class TopicService implements BaseRESTService {
  public findAll = () => {
    return Topic.findAll({
      attributes: ['id', 'title'],
    });
  };

  public create = (data: CreateTopicType) => {
    return Topic.create(data);
  };
}

export const topicService = new TopicService();
