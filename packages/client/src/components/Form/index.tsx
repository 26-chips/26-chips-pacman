import {
  Formik,
  Form as FormikForm,
  FormikValues,
  Field,
  FieldProps,
  FieldInputProps,
} from 'formik';
import { Input } from 'components/Input';
import { FormProps, IField } from './types';
import { validate } from './validate';

const renderField = (
  { component = 'INPUT', props }: IField,
  field: FieldInputProps<any>,
  error?: string
) => {
  switch (component) {
    case 'INPUT':
      return <Input {...props} {...field} errorMessage={error} />;
  }
};

export function Form<T extends FormikValues>(props: FormProps<T>) {
  const { children, className, fields, ...restProps } = props;

  return (
    <Formik {...restProps}>
      {({ errors, touched }) => (
        <FormikForm className={className}>
          <div>
            {fields.map(item => {
              const { name, customValidation, validationType } = item;
              const error = touched[name] ? errors[name] : '';
              return (
                <Field
                  key={name}
                  name={name}
                  validate={
                    customValidation
                      ? customValidation
                      : validate(validationType)
                  }>
                  {({ field }: FieldProps) =>
                    renderField(item, field, error as string)
                  }
                </Field>
              );
            })}
          </div>
          {children}
        </FormikForm>
      )}
    </Formik>
  );
}
