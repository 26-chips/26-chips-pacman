import Authorization from 'assets/img/Authorization.svg';
import { Button, Form, Link, Loader } from 'components';
import { ROUTES } from 'router';
import { useSigninMutation } from 'api';
import type { SigninData } from 'app/types';

import { loginConfig } from '../configs';
import styles from './styles.module.scss';

export const SigninPage = () => {
  const [signin, { isLoading }] = useSigninMutation();

  const onSubmit = async (data: SigninData) => {
    try {
      await signin(data).unwrap();
    } catch (e) {
      throw new Error((e as Error).message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
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
          onSubmit={onSubmit}
          className={styles.form}
          fields={loginConfig}>
          <div className={styles.buttons}>
            <Button type="submit">Войти</Button>
            <Link to={ROUTES.SIGNUP}>Зарегистрироваться</Link>
          </div>
        </Form>
      </div>
    </>
  );
};
