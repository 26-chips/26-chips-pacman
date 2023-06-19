import { useNavigate } from 'react-router-dom';
import { Form, Button, Link, Loader } from 'components';
import { ROUTES } from 'router';
import { useUpdatePasswordMutation } from 'api';
import { PasswordData } from 'app/types';

import { passwordConfig } from '../configs';

import styles from './profile.module.scss';

export const PasswordForm = (): JSX.Element => {
  const navigate = useNavigate();
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const onSubmit = async (data: PasswordData) => {
    try {
      await updatePassword(data).unwrap();
      navigate(ROUTES.PROFILE);
    } catch (e) {
      throw new Error((e as Error).message);
    }
  };

  const initialValues = {
    oldPassword: '',
    newPassword: '',
    repeatPassword: '',
  };

  return (
    <>
      {isLoading && <Loader />}
      <Form
        initialValues={initialValues}
        className={styles.form}
        fields={passwordConfig}
        onSubmit={onSubmit}>
        <div className={styles.buttons}>
          <Button type="submit">Сохранить</Button>
          <Link to={ROUTES.PROFILE}>Назад в профиль</Link>
        </div>
      </Form>
    </>
  );
};
