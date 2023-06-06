import { useParams } from 'react-router';
import { Loader } from 'components';

import { ProfileAvatar } from './ProfileAvatar';
import ProfileForm from './ProfileForm';
import { PasswordForm } from './PasswordForm';

import styles from './profile.module.scss';
import { withUser, type WithUserProps } from './withUser';
import { withLoading, type WithLoadingProps } from './withLoading';

interface ProfilePageProps extends WithUserProps, WithLoadingProps {}

const ProfilePage = (props: ProfilePageProps): JSX.Element => {
  const { id } = useParams();

  const Form = id === 'password' ? PasswordForm : ProfileForm;

  return (
    <section className={styles.container}>
      {props.isLoading && <Loader />}
      <div className={styles.profile}>
        <ProfileAvatar {...props} />
        <Form {...props} />
      </div>
    </section>
  );
};

export default withLoading(withUser<ProfilePageProps>(ProfilePage));
