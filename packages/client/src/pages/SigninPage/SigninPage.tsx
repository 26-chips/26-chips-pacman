import { FunctionComponent } from 'react';
import Authorization from 'assets/img/Authorization.png';
import styles from './styles.module.scss';
import { Button, Form } from 'components';
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
          onSubmit={onSubmit}
          fieldsClassName={styles.inputs}
          fields={[
            {
              type: 'INPUT',
              name: 'login',
              props: {
                title: 'Логин',
                showDeleteSymbol: true,
              },
            },
            {
              type: 'INPUT',
              name: 'password',
              props: {
                title: 'Пароль',
                type: 'password',
                showDeleteSymbol: true,
              },
            },
          ]}>
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
