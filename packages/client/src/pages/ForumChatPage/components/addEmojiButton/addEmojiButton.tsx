import styles from './addEmojiButton.module.scss';
import iconPlus from '../../../../assets/icons/icon-plus.svg';
import { emojisList } from '../../../../utilise/emojis';
import { MouseEvent, useState } from 'react';

export const AddEmojiButton = () => {
  const [showEmojisList, setShowEmojisList] = useState(false);

  const handleShowEmojisList = () => {
    setShowEmojisList(!showEmojisList);
  };

  return (
    <button onClick={handleShowEmojisList} className={styles.button}>
      <img src={iconPlus} alt="Добавить" />
      {showEmojisList ? (
        <div onClick={(e: MouseEvent) => e.stopPropagation()} className={styles.emojisList}>
          {emojisList.map((emoji, index) => (
            <span key={index}>{emoji}</span>
          ))}
        </div>
      ) : (
        ''
      )}
    </button>
  );
};
