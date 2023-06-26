import { Formik, Form as FormikForm, FormikValues, Field } from 'formik';
import { Input } from 'components';
import { FormProps } from './types';
import { validate } from './validate';

export function Form<T extends FormikValues>(props: FormProps<T>) {
  const { children, className, fields, ...restProps } = props;

  return (
    <Formik validateOnChange={false} {...restProps}>
      {({ values, errors, touched, setFieldValue }) => (
        <FormikForm className={className}>
          {fields.map(({ name, validationType, customValidation, ...rest }) => {
            const error = touched[name] ? errors[name] : '';

            return (
              <Field
                key={name}
                {...rest}
                name={name}
                validate={
                  customValidation
                    ? (value: string) => customValidation(values, value)
                    : validate<T>(values, validationType)
                }
                as={Input}
                setValue={setFieldValue}
                errorMessage={error}
              />
            );
          })}
          {children}
        </FormikForm>
      )}
    </Formik>
  );
}
