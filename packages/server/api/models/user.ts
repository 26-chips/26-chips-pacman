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
  AfterBulkCreate,
} from 'sequelize-typescript';
import { ModelAttributes } from 'sequelize/types';

export interface IUser {
  id: number;
  name: string;
  avatar_url?: string;
}

@Table({
  timestamps: true,
  underscored: true,
  tableName: 'users',
})
export class User extends Model<IUser> {
  @AutoIncrement
  @Unique
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  avatar_url: string;
}
