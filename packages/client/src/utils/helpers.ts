import { User } from '../app/types';

export const formUserName = (defaultName: string, user?: User) => {
  return user
    ? user.display_name
      ? user.display_name
      : `${user.first_name} ${user.second_name}`
    : defaultName;
};
