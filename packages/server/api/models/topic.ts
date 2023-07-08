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

import { User } from './user';

export type TopicType = {
  id: string;
  title: string;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  //commentsIds: number[];
};

export type CreateTopicType = Omit<TopicType, 'id' | 'createdAt' | 'updatedAt'>;

@Table({
  createdAt: true,
  updatedAt: true,
  underscored: true,
  tableName: 'topics',
})
export class Topic extends Model<TopicType, CreateTopicType> {
  @AutoIncrement
  @Unique
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  title: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'author_id',
  })
  authorId: number;

  @BelongsTo(() => User)
  user: User;
}
