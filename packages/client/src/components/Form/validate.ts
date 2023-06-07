import { ValidationTypes } from './types';

export const validate = <Data>(
  values: Data,
  name?: keyof typeof ValidationTypes
) => {
  const REQUIRED = 'Поле обязательно для заполнения';
  const INCORRECT_SYMBOLS = 'Недопустимые символы';
  const LENGTH_FIELD = (to: number, from: number) =>
    `Длина поля от ${to} до ${from} символов`;
  return (value: string) => {
    switch (name) {
      case 'login':
        if (!value) return REQUIRED;
        if (value.length < 3 || value.length > 20) return LENGTH_FIELD(3, 20);
        if (!/([-_]?[a-z0-9]+)$/i.test(value)) return INCORRECT_SYMBOLS;
        break;
      case 'password':
        if (!value) return REQUIRED;
        if (value.length < 8 || value.length > 40) return LENGTH_FIELD(8, 40);
        if (!/(?=.*[A-ZА-Я])(?=.*\d).+/.test(value))
          return 'Пароль должен содержать хотя бы одну цифру и одну заглавную букву';
        break;
    }
    return '';
  };
};
