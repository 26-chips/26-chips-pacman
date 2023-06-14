import { useNavigate } from 'react-router';
import { Form, Button, Link } from 'components';
import { ROUTES } from 'router';
import { updatePassword } from 'api';

import { passwordConfig } from '../configs';

import styles from './profile.module.scss';
import type { WithLoadingProps } from './withLoading';

interface IPassword {
  oldPassword: string;
  newPassword: string;
  repeatPassword: string;
}

export const PasswordForm = ({
  setIsLoading,
}: Omit<WithLoadingProps, 'isLoading'>): JSX.Element => {
  const navigate = useNavigate();

  const onSubmit = async (data: IPassword) => {
    try {
      setIsLoading(true);

      await updatePassword(data);
      navigate(ROUTES.PROFILE);

      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  const initialValues = {
    oldPassword: '',
    newPassword: '',
    repeatPassword: '',
  };

  return (
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
  );
};
