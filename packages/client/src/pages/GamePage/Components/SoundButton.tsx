import styles from './gameBlock.module.scss';
import muteIcon from 'assets/icons/mute.svg';
import playIcon from 'assets/icons/play.svg';
import { useState } from 'react';

interface SoundButtonProps {
  toggleMute: () => void;
}

export const SoundButton = (props: SoundButtonProps) => {
  const { toggleMute } = props;
  const [isMuted, mute] = useState(false);

  return (
    <img
      onClick={() => {
        toggleMute();
        mute(!isMuted);
      }}
      className={styles.icon}
      src={isMuted ? playIcon : muteIcon}
      alt="mute sound switch"
    />
  );
};
