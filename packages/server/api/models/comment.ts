/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Model,
  Table,
  Column,
  AutoIncrement,
  PrimaryKey,
  DataType,
  AllowNull,
  Unique,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { User, Topic } from '.';

export type CommentType = {
  id: string;
  text: string;
  authorId: number;
  createdAt: Date;
  topicId: number;
  parentCommentId?: string;
};

export type CreateCommentType = Omit<CommentType, 'id' | 'createdAt'>;

@Table({
  createdAt: true,
  updatedAt: false,
  underscored: true,
  tableName: 'comments',
})
export class Comment extends Model<CommentType, CreateCommentType> {
  @AutoIncrement
  @Unique
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  text: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  parentCommentId: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'author_id',
  })
  authorId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Topic)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'topic_id',
  })
  topicId: number;

  @BelongsTo(() => Topic, {
    onDelete: 'CASCADE',
  })
  topic: Topic;
}
