import { FunctionComponent } from 'react';
import Authorization from 'assets/img/Authorization.svg';
import { Button, Form, Link, Loader } from 'components';
import { ROUTES } from 'router';
import { useSigninMutation, useFetchYandexServiceIdMutation } from 'api';
import type { SigninData } from 'app/types';
import { loginConfig } from '../configs';
import styles from './styles.module.scss';
import { OAUTH_REDIRECT_URL } from 'utils/consts';
import { useNavigate } from 'react-router-dom';
import yandexLogo from 'assets/icons/yandex-logo.svg';

const SigninPage: FunctionComponent = () => {
  const [signin, { isLoading }] = useSigninMutation();
  const [getServiceId] = useFetchYandexServiceIdMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: SigninData) => {
    try {
      await signin(data).unwrap();
      navigate(ROUTES.START);
    } catch (e) {
      throw new Error((e as Error).message);
    }
  };

  const onOAuthClick = async () => {
    try {
      const res = await getServiceId({
        redirect_uri: OAUTH_REDIRECT_URL,
      }).unwrap();

      window.location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${res.service_id}&redirect_uri=${OAUTH_REDIRECT_URL}`;
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
            <Button type="button" onClick={onOAuthClick} thema="transparent">
              <div className={styles.yandexButtonContent}>
                <img src={yandexLogo} alt="Добавить" /> Войти с Яндекс ID
              </div>
            </Button>
            <Link to={ROUTES.SIGNUP}>Зарегистрироваться</Link>
          </div>
        </Form>
      </div>
    </>
  );
};

export default SigninPage;
