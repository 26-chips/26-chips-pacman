import { BaseRESTService } from './BaseRESTService';
import { Comment, CreateCommentType } from '../models';

export class CommentService implements BaseRESTService {
  public create = (data: CreateCommentType) => {
    return Comment.create(data);
  };
}

export const commentService = new CommentService();
