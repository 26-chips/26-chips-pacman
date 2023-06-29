import styles from './gameBlock.module.scss';
import muteIcon from 'assets/icons/mute.svg';
import playIcon from 'assets/icons/play.svg';

interface SoundButtonProps {
  toggleMute: () => void;
  isMuted: boolean;
}

export const SoundButton = (props: SoundButtonProps) => {
  const { toggleMute, isMuted } = props;

  return (
    <img
      onClick={toggleMute}
      className={styles.icon}
      src={isMuted ? playIcon : muteIcon}
      alt="mute sound switch"
    />
  );
};
