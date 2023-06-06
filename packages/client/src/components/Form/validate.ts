import { ValidationTypes } from './types';

export const REQUIRED = 'Поле обязательно для заполнения';
const INCORRECT_SYMBOLS = 'Недопустимые символы';
const LENGTH_FIELD = (to: number, from: number) =>
  `Длина поля от ${to} до ${from} символов`;

export const validate = <Data>(
  values: Data,
  name?: keyof typeof ValidationTypes
) => {
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
          return 'Не хватает хотя бы одной цифры или одной заглавной буквы';
        break;
      case 'email':
        if (!value) return REQUIRED;
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(value))
          return 'Некорректный формат поля email';
        break;
      case 'name':
        if (!value) return REQUIRED;
        if (!/^[A-ZА-Я]/.test(value)) return 'Первая буква заглавная';
        if (!/^[A-ZА-Яa-zа-я-]+$/.test(value))
          return 'Только буквы, допустим дефис';
        break;
      case 'phone':
        if (!value) return REQUIRED;
        if (/[^0-9+]/g.test(value)) return 'Номер телефона, только цифры';
        if (value.length < 10 || value.length > 15) return LENGTH_FIELD(10, 15);
    }
    return '';
  };
};
