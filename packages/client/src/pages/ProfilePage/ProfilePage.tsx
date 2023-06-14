import { useParams } from 'react-router';
import { Loader } from 'components';

import { useFetchUserQuery } from 'api';
import { ProfileAvatar } from './ProfileAvatar';
import ProfileForm from './ProfileForm';
import { PasswordForm } from './PasswordForm';
import styles from './profile.module.scss';

const ProfilePage = (): JSX.Element => {
  const { id } = useParams();
  const { data: user, isLoading } = useFetchUserQuery();

  const Form = id === 'password' ? PasswordForm : ProfileForm;

  return (
    <section className={styles.container}>
      {isLoading && <Loader />}
      {user && (
        <div className={styles.profile}>
          <ProfileAvatar user={user} />
          <Form />
        </div>
      )}
    </section>
  );
};

export default ProfilePage;
