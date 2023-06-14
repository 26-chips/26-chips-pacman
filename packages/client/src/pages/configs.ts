import { REQUIRED } from 'components/Form/validate';

type Password = {
  password: string;
  newPassword: string;
};

export type FieldConfig<T = unknown> = {
  name: string;
  title: string;
  type: string;
  validationType?: 'login' | 'password' | 'email' | 'phone' | 'name';
  inlineTitle?: boolean;
  showDeleteSymbol?: boolean;
  customValidation?: (
    values: T,
    value: string
  ) => 'Поле обязательно для заполнения' | 'Пароли не совпадают' | '';
};

const customValidation = (password: string, value: string) => {
  if (!value) return REQUIRED;
  if (password !== value) return 'Пароли не совпадают';
  return '';
};

export const loginConfig: FieldConfig[] = [
  {
    name: 'login',
    title: 'Логин',
    validationType: 'login',
    type: 'text',
  },
  {
    name: 'password',
    title: 'Пароль',
    validationType: 'password',
    type: 'password',
  },
];

export const profileConfig: FieldConfig[] = [
  {
    name: 'login',
    title: 'Логин',
    validationType: 'login',
    type: 'text',
    inlineTitle: true,
    showDeleteSymbol: false,
  },
  {
    name: 'first_name',
    title: 'Имя',
    type: 'text',
    validationType: 'name',
    inlineTitle: true,
    showDeleteSymbol: false,
  },
  {
    name: 'second_name',
    title: 'Фамилия',
    type: 'text',
    validationType: 'name',
    inlineTitle: true,
    showDeleteSymbol: false,
  },
  {
    name: 'display_name',
    title: 'Никнейм',
    type: 'text',
    validationType: 'name',
    inlineTitle: true,
    showDeleteSymbol: false,
  },
  {
    name: 'email',
    title: 'Почта',
    type: 'email',
    validationType: 'email',
    inlineTitle: true,
    showDeleteSymbol: false,
  },
  {
    name: 'phone',
    title: 'Телефон',
    type: 'tel',
    validationType: 'phone',
    inlineTitle: true,
    showDeleteSymbol: false,
  },
];

export const passwordConfig: FieldConfig<Pick<Password, 'newPassword'>>[] = [
  {
    name: 'oldPassword',
    title: 'Старый пароль',
    type: 'password',
    validationType: 'password',
    inlineTitle: true,
    showDeleteSymbol: false,
  },
  {
    name: 'newPassword',
    title: 'Новый пароль',
    type: 'password',
    validationType: 'password',
    inlineTitle: true,
    showDeleteSymbol: false,
  },
  {
    name: 'repeatPassword',
    title: 'Повторите новый пароль',
    type: 'password',
    inlineTitle: true,
    showDeleteSymbol: false,
    customValidation: ({ newPassword }, value) =>
      customValidation(newPassword, value),
  },
];

export const registrationConfig: FieldConfig<Pick<Password, 'password'>>[] = [
  {
    name: 'email',
    validationType: 'email',
    title: 'Почта',
    type: 'email',
  },
  {
    name: 'first_name',
    validationType: 'name',
    title: 'Имя',
    type: 'text',
  },
  {
    name: 'second_name',
    validationType: 'name',
    title: 'Фамилия',
    type: 'text',
  },
  {
    name: 'phone',
    validationType: 'phone',
    title: 'Телефон',
    type: 'tel',
  },
  {
    name: 'login',
    validationType: 'login',
    title: 'Логин',
    type: 'text',
  },
  {
    name: 'password',
    validationType: 'password',
    title: 'Пароль',
    type: 'password',
  },
  {
    name: 'repeat_password',
    customValidation: ({ password }, value) =>
      customValidation(password, value),
    title: 'Повторите пароль',
    type: 'password',
  },
];
