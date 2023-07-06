import styles from './gameBlock.module.scss';
import muteIcon from 'assets/icons/mute.svg';
import playIcon from 'assets/icons/play.svg';
import { useState } from 'react';
import { AudioElements } from './SoundConfig';

interface SoundButtonProps {
  toggleMute: () => void;
}

export const SoundButton = (props: SoundButtonProps) => {
  const { toggleMute } = props;
  const [isMuted, setIsMuted] = useState(false);

  return (
    <img
      onClick={() => {
        toggleMute();
        setIsMuted(!isMuted);
        AudioElements.toggle.play();
      }}
      className={styles.icon}
      src={isMuted ? playIcon : muteIcon}
      alt="mute sound switch"
    />
  );
};
