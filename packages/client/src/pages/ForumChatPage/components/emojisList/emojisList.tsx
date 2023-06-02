import styles from './emojisList.module.scss';
import { emojisList } from '../../../../utils/emojis';
import { MouseEvent } from 'react';

export const EmojisList = () => {
  return (
    <div
      onClick={(e: MouseEvent) => e.stopPropagation()}
      className={styles.emojisList}>
      {emojisList.map((emoji, index) => (
        <span key={index}>{emoji}</span>
      ))}
    </div>
  );
};
