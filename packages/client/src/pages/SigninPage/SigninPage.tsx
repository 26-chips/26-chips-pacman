import { FunctionComponent } from 'react';
import { Field, FieldProps } from 'formik';
import Authorization from 'assets/img/Authorization.png';
import styles from './styles.module.scss';
import { Button, Form, Input } from 'components';
import { auth } from './api';
import { NavLink } from 'react-router-dom';
import { ROUTES } from 'router';

interface IData {
  login: string;
  password: string;
}

const SigninPage = () => {
  const onSubmit = async (data: IData) => {
    const response = await auth(data);
    console.log(response);
  };

  return (
    <>
      <img
        src={Authorization}
        alt="authorization title"
        className={styles.title}
      />
      <div className={styles.authorization}>
        <Form
          initialValues={{
            login: '',
            password: '',
          }}
          onSubmit={onSubmit}>
          <div className={styles.inputs}>
            <Field name="login">
              {({ field }: FieldProps) => <Input title="Логин" {...field} />}
            </Field>
            <Field name="password">
              {({ field }: FieldProps) => (
                <Input title="Пароль" type="password" {...field} />
              )}
            </Field>
          </div>
          <div className={styles.buttons}>
            <Button type="submit">Войти</Button>
            <NavLink to={ROUTES.SIGNUP}>Зарегистрироваться</NavLink>
          </div>
        </Form>
      </div>
    </>
  );
};

export default SigninPage as FunctionComponent;
