import { useState } from 'react';
import type { SyntheticEvent } from 'react';
import { Form, Button, Link, Loader } from 'components';
import { useUpdateProfileMutation, useFetchUserQuery } from 'api';
import { ROUTES } from 'router';
import type { ProfileData } from 'app/types';
import { profileConfig } from '../configs';
import styles from './profile.module.scss';

const ProfileForm = (): JSX.Element => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { data: user } = useFetchUserQuery();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const onSubmit = async (data: ProfileData) => {
    try {
      await updateProfile(data).unwrap();
    } catch (e) {
      throw new Error((e as Error).message);
    } finally {
      setIsEditMode(false);
    }
  };

  const handleEditButtonClick = (event: SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsEditMode(true);
  };

  const initialValues = profileConfig.reduce(
    (acc, { name }) => ({
      ...acc,
      [name]: user ? user[name as keyof ProfileData] : '',
    }),
    {} as ProfileData & { password: string }
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
    <>
      {isLoading && <Loader />}
      <Form
        initialValues={initialValues}
        className={styles.form}
        fields={styledFields}
        onSubmit={onSubmit}>
        <div className={styles.buttons}>
          {isEditMode ? <Button type="submit">Сохранить</Button> : buttons}
        </div>
      </Form>
    </>
  );
};

export default ProfileForm;
