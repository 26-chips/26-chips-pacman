import { FunctionComponent } from 'react';
import Authorization from 'assets/img/Authorization.svg';
import styles from './styles.module.scss';
import { Button, Form, Link } from 'components';
import { ROUTES } from 'router';
import { auth } from 'api';

interface IData {
  login: string;
  password: string;
}

const SigninPage: FunctionComponent = () => {
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
          onSubmit={onSubmit}
          className={styles.form}
          fields={[
            {
              component: 'INPUT',
              name: 'login',
              validationType: 'login',
              props: {
                title: 'Логин',
              },
            },
            {
              component: 'INPUT',
              name: 'password',
              validationType: 'password',
              props: {
                title: 'Пароль',
                type: 'password',
              },
            },
          ]}>
          <div className={styles.buttons}>
            <Button type="submit">Войти</Button>
            <Link to={ROUTES.SIGNUP}>Зарегистрироваться</Link>
          </div>
        </Form>
      </div>
    </>
  );
};

export default SigninPage;
