import { Avatar } from 'components';
import { useModal } from 'hooks';

import type { WithUserProps } from '../withUser';
import type { WithLoadingProps } from '../withLoading';

import { AvatarModal } from './AvatarModal';
import styles from './profileAvatar.module.scss';

export interface ProfileAvatarProps extends WithUserProps, WithLoadingProps {}

export function ProfileAvatar(props: ProfileAvatarProps) {
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();

  return (
    <>
      <div className={styles.avatar} onClick={handleOpenModal}>
        <Avatar image={props.user.avatar} />
      </div>
      {isOpen && <AvatarModal {...props} handleCloseModal={handleCloseModal} />}
    </>
  );
}
