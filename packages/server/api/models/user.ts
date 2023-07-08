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
} from 'sequelize-typescript';

export type UserType = {
  id: number;
  name: string;
  avatarUrl?: string;
};

export type CreateUserType = Omit<UserType, 'id'>;

@Table({
  createdAt: false,
  updatedAt: false,
  underscored: true,
  tableName: 'users',
})
export class User extends Model<UserType, CreateUserType> {
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
  avatarUrl: string;
}
