//Пример функции валидации инпута
export const validateFn = (value: string): boolean => {
  return !/\d/.test(value);
};
