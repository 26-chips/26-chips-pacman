import styles from './emojiButton.module.scss';
import { EmojiType } from '../../types';

interface EmojiButtonProps {
  emoji: EmojiType;
}

export const EmojiButton = (props: EmojiButtonProps) => {
  const { emoji, number } = props.emoji;

  return (
    <button className={styles.button}>
      <span>{emoji}</span>
      <span className={styles.number}>{number}</span>
    </button>
  );
};
