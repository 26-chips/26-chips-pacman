import { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Registration from 'assets/img/Registration.svg';
import styles from './styles.module.scss';
import { Button, Form, Link } from 'components';
import { ROUTES } from 'router';
import { registration } from 'api';
import { registrationConfig } from '../configs';

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
      navigate(ROUTES.MAIN);
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
          fields={registrationConfig}>
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
