import { useState } from 'react';
import type { SyntheticEvent } from 'react';
import { Form, Button, Link } from 'components';
import { updateProfile } from 'api';
import { ROUTES } from 'router';

import { profileConfig } from '../configs';

import type { WithUserProps, IUser } from './withUser';
import type { WithLoadingProps } from './withLoading';
import styles from './profile.module.scss';

interface ProfileFormProps extends WithUserProps, WithLoadingProps {}

const ProfileForm = ({
  user,
  setUser,
  setIsLoading,
}: ProfileFormProps): JSX.Element => {
  const [isEditMode, setIsEditMode] = useState(false);

  const onSubmit = async (data: IUser) => {
    try {
      setIsLoading(true);
      const updatedUser = await updateProfile(data);
      setUser(updatedUser.data);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
    setIsEditMode(false);
  };

  const handleEditButtonClick = (event: SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsEditMode(true);
  };

  const initialValues = profileConfig.reduce(
    (acc, { name }) => ({
      ...acc,
      [name]: user ? user[name as keyof IUser] : '',
    }),
    {} as IUser & { password: string }
  );

  const styledFields = profileConfig.map(field => ({
    ...field,
    disabled: !isEditMode,
  }));

  const buttons = (
    <>
      <Button className={styles['edit-buttom']} onClick={handleEditButtonClick}>
        Редактировать
      </Button>
      <Link to={`${ROUTES.PROFILE}/password`}>Изменить пароль</Link>
    </>
  );

  return (
    <Form
      initialValues={initialValues}
      className={styles.form}
      fields={styledFields}
      onSubmit={onSubmit}>
      <div className={styles.buttons}>
        {isEditMode ? <Button type="submit">Сохранить</Button> : buttons}
      </div>
    </Form>
  );
};

export default ProfileForm;
