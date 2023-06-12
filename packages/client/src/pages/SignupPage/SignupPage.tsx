import { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Registration from 'assets/img/Registration.svg';
import styles from './styles.module.scss';
import { Button, Form, Link } from 'components';
import { ROUTES } from 'router';
import { REQUIRED } from 'components/Form/validate';
import { registration } from 'api';

interface IData {
  email: string;
  first_name: string;
  second_name: string;
  phone: string;
  login: string;
  password: string;
  repeat_password: string;
}

const SignupPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: IData) => {
    setLoading(true);
    try {
      const response = await registration(data);
      console.log(response);
      navigate('/');
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <img
        src={Registration}
        alt="Registration title"
        className={styles.title}
      />
      <div className={styles.registration}>
        <Form
          initialValues={{
            email: '',
            first_name: '',
            second_name: '',
            phone: '',
            login: '',
            password: '',
            repeat_password: '',
          }}
          onSubmit={onSubmit}
          className={styles.form}
          fields={[
            {
              component: 'INPUT',
              name: 'email',
              validationType: 'email',
              props: {
                title: 'Почта',
              },
            },
            {
              component: 'INPUT',
              name: 'first_name',
              validationType: 'name',
              props: {
                title: 'Имя',
              },
            },
            {
              component: 'INPUT',
              name: 'second_name',
              validationType: 'name',
              props: {
                title: 'Фамилия',
              },
            },
            {
              component: 'INPUT',
              name: 'phone',
              validationType: 'phone',
              props: {
                title: 'Телефон',
              },
            },
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
            {
              component: 'INPUT',
              name: 'repeat_password',
              customValidation: ({ password }, value) => {
                if (!value) return REQUIRED;
                if (password !== value) return 'Пароли не совпадают';
                return '';
              },
              props: {
                title: 'Повторите пароль',
                type: 'password',
              },
            },
          ]}>
          <div className={styles.buttons}>
            <Button type="submit" loading={loading}>
              Зарегистрироваться
            </Button>
            <Link to={ROUTES.SIGNIN}>Войти</Link>
          </div>
        </Form>
      </div>
    </>
  );
};

export default SignupPage;
