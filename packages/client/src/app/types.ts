export type User = {
  id: number;
  login: string;
  display_name: string;
  first_name: string;
  second_name: string;
  avatar: string;
  email: string;
  phone: string;
};

export type SigninData = {
  login: string;
  password: string;
};

export type SignupData = {
  email: string;
  first_name: string;
  second_name: string;
  phone: string;
  login: string;
  password: string;
  repeat_password: string;
};

export type ProfileData = Omit<User, 'id' | 'avatar'>;

export type PasswordData = {
  oldPassword: string;
  newPassword: string;
  repeatPassword: string;
};
