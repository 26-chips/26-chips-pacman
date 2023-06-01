import { ReactNode } from 'react';
import { Formik, FormikConfig, Form as FORM, FormikValues } from 'formik';

interface FormProps<T> extends FormikConfig<T> {
  className?: string;
  children: ReactNode;
}

export function Form<T extends FormikValues>(props: FormProps<T>) {
  const { initialValues, onSubmit, children, className } = props;

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <FORM className={className}>{children}</FORM>
    </Formik>
  );
}
