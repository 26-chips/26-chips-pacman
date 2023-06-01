import styles from './addEmojiButton.module.scss';
import iconPlus from '../../../../assets/icons/icon-plus.svg';
import { emojisList } from '../../../../utilise/emojis';
import { useState } from 'react';

export const AddEmojiButton = () => {
  const [showEmojisList, setShowEmojisList] = useState(false);

  const handleShowEmojisList = () => {
    setShowEmojisList(!showEmojisList);
  };

  return (
    <button onClick={handleShowEmojisList} className={styles.button}>
      <img src={iconPlus} alt="Добавить" />
      {showEmojisList ? (
        <div className={styles.emojisList}>
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
