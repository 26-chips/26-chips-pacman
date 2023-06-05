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

enum FieldComponent {
  INPUT = 'INPUT',
}

interface IField {
  component: keyof typeof FieldComponent;
  name: string;
  props: Record<string, unknown>;
}

interface FormProps<T> extends FormikConfig<T> {
  className?: string;
  children: ReactNode;
  initialValues: T;
  onSubmit: (data: T) => Promise<void>;
  fields: IField[];
}

const renderField = (
  { component = 'INPUT', props }: IField,
  field: FieldInputProps<any>
) => {
  switch (component) {
    case 'INPUT':
      return <Input {...props} {...field} />;
  }
};

export function Form<T extends FormikValues>(props: FormProps<T>) {
  const { children, className, fields, ...restProps } = props;

  return (
    <Formik {...restProps}>
      <FormikForm className={className}>
        <div>
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
      </FormikForm>
    </Formik>
  );
}
