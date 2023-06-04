import styles from './emojiButton.module.scss';
import { EmojiType } from '../../types';

export const EmojiButton = (props: Omit<EmojiType, 'id'>) => {
  const { emoji, number } = props;

  return (
    <button className={styles.button}>
      <span>{emoji}</span>
      <span className={styles.number}>{number}</span>
    </button>
  );
};
