import type { ReactNode } from 'react';
import type { FormikConfig } from 'formik';

export enum ValidationTypes {
  login = 'login',
  password = 'password',
}

export interface IField<Data> {
  name: string;
  validationType?: keyof typeof ValidationTypes;
  customValidation?: (values: Data, value: string) => void;
  title: string;
  type: string;
}
export interface FormProps<T> extends FormikConfig<T> {
  className?: string;
  children: ReactNode;
  initialValues: T;
  onSubmit: (data: T) => Promise<void>;
  fields: IField<T>[];
}
