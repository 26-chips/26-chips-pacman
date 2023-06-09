import { SyntheticEvent } from 'react';
import cn from 'classnames';
import defaultAvatar from 'assets/icons/default_avatar.svg';

import styles from './avatar.module.scss';

interface AvatarProps {
  image?: string;
  className?: string;
}

const onError = (event: SyntheticEvent<HTMLImageElement>) => {
  event.currentTarget.onerror = null;
  event.currentTarget.src = defaultAvatar;
};

export function Avatar({ image, className }: AvatarProps) {
  return (
    <img
      src={`https://ya-praktikum.tech/api/v2/resources${image}`}
      alt="user avatar"
      className={cn(styles.avatar, className)}
      loading="lazy"
      onError={onError}
    />
  );
}
