import styles from './addEmojiButton.module.scss';
import iconPlus from '../../../../assets/icons/icon-plus.svg';
import { useState } from 'react';
import { EmojisList } from '../emojisList/emojisList';

export const AddEmojiButton = () => {
  const [showEmojisList, setShowEmojisList] = useState(false);

  const handleShowEmojisList = () => {
    setShowEmojisList(!showEmojisList);
  };

  return (
    <button onClick={handleShowEmojisList} className={styles.button}>
      <img src={iconPlus} alt="Добавить" />
      {showEmojisList ? <EmojisList /> : ''}
    </button>
  );
};
