import { ReactNode } from 'react';
import { FormikConfig } from 'formik';

enum FieldComponent {
  INPUT = 'INPUT',
}

export enum ValidationTypes {
  login = 'login',
  password = 'password',
}

export interface IField<Data> {
  component: keyof typeof FieldComponent;
  name: string;
  validationType?: keyof typeof ValidationTypes;
  customValidation?: (values: Data, value: string) => void;
  props?: Record<string, unknown>;
}

export interface FormProps<T> extends FormikConfig<T> {
  className?: string;
  children: ReactNode;
  initialValues: T;
  onSubmit: (data: T) => Promise<void>;
  fields: IField<T>[];
}
