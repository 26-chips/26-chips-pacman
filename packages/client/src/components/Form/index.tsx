import { ReactNode } from 'react';
import { Formik, FormikConfig, Form as FORM, FormikValues } from 'formik';

interface FormProps<T> extends FormikConfig<T> {
  className?: string;
  children: ReactNode;
}

export function Form<T extends FormikValues>(props: FormProps<T>) {
  const { children, className, ...restProps } = props;

  return (
    <Formik {...restProps}>
      <FORM className={className}>{children}</FORM>
    </Formik>
  );
}
