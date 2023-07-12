import { useNavigate } from 'react-router-dom';
import Registration from 'assets/img/Registration.svg';
import styles from './styles.module.scss';
import { Button, Form, Link } from 'components';
import { ROUTES } from 'router';
import { SignupData } from 'app/types';
import { useSignupMutation } from 'api';
import { registrationConfig } from '../configs';

export const SignupPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [signup, { isLoading }] = useSignupMutation();

  const onSubmit = async (data: SignupData) => {
    try {
      await signup(data).unwrap();
      navigate(ROUTES.MAIN);
    } catch (e) {
      throw new Error((e as Error).message);
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
            <Button type="submit" loading={isLoading}>
              Зарегистрироваться
            </Button>
            <Link to={ROUTES.SIGNIN}>Войти</Link>
          </div>
        </Form>
      </div>
    </>
  );
};
