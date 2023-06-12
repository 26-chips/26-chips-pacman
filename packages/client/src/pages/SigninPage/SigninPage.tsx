import { FunctionComponent } from 'react';
import Authorization from 'assets/img/Authorization.png';
import styles from './styles.module.scss';
import { Button, Form, Link } from 'components';
import { ROUTES } from 'router';
import { auth } from 'api';

interface IData {
  login: string;
  password: string;
  type?: string;
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
              name: 'login',
              validationType: 'login',
              title: 'Логин',
              type: 'text',
            },
            {
              name: 'password',
              validationType: 'password',
              title: 'Пароль',
              type: 'password',
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
