import { Avatar } from 'components';
import { useModal } from 'hooks';
import type { User } from 'app/types';

import { AvatarModal } from './AvatarModal';
import styles from './profileAvatar.module.scss';

interface ProfileAvatarProps {
  user: User;
}

export function ProfileAvatar({ user }: ProfileAvatarProps) {
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();

  return (
    <>
      <div className={styles.avatar} onClick={handleOpenModal}>
        <Avatar image={user.avatar} />
      </div>
      {isOpen && <AvatarModal handleCloseModal={handleCloseModal} />}
    </>
  );
}
