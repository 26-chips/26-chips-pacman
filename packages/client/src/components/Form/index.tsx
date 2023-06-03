import { ReactNode } from 'react';
import {
  Formik,
  FormikConfig,
  Form as FormikForm,
  FormikValues,
  Field,
  FieldProps,
  FieldInputProps,
} from 'formik';
import { Input } from 'components/Input';

enum Types {
  INPUT = 'INPUT',
}

interface IField {
  type: keyof typeof Types;
  name: string;
  props: Record<string, unknown>;
}

interface FormProps<T> extends FormikConfig<T> {
  className?: string;
  fieldsClassName?: string;
  children: ReactNode;
  initialValues: T;
  onSubmit: (data: T) => Promise<void>;
  fields: IField[];
}

const renderField = ({ type, props }: IField, field: FieldInputProps<any>) => {
  switch (type) {
    case 'INPUT':
      return <Input {...props} {...field} />;
    default:
      return null;
  }
};

export function Form<T extends FormikValues>(props: FormProps<T>) {
  const { children, className, fields, fieldsClassName, ...restProps } = props;

  return (
    <Formik {...restProps}>
      <FormikForm className={className}>
        <>
          <div className={fieldsClassName}>
            {fields.map(item => {
              const { name } = item;
              return (
                <Field key={name} name={name}>
                  {({ field }: FieldProps) => renderField(item, field)}
                </Field>
              );
            })}
          </div>
          {children}
        </>
      </FormikForm>
    </Formik>
  );
}
