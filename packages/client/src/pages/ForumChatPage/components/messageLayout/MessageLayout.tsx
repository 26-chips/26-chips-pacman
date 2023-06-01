import styles from './messageLayout.module.scss';
import { AddEmojiButton } from '../addEmojiButton/addEmojiButton';
import { EmojiButton } from '../emojiButton/emojiButton';
import { EmojiType } from '../../types';

interface MessageLayoutProps {
  avatar: string;
  message: string;
  time: string;
  name: string;
  interlocutor?: boolean;
  emojis?: EmojiType[];
}

export const MessageLayout = (props: MessageLayoutProps) => {
  const { avatar, message, time, name, emojis, interlocutor = true } = props;

  return interlocutor ? (
    <div className={styles.messageLayout}>
      <img className={styles.avatar} src={avatar} alt="Аватар" />
      <div className={styles.messageContainer}>
        <p className={styles.authorName}>{name}</p>
        <p className={styles.message}>{message}</p>
        <p className={styles.messageTime}>{time}</p>
        <div className={styles.emojiContainer}>
          {emojis && emojis?.length > 0
            ? emojis.map(emoji => <EmojiButton key={emoji.id} emoji={emoji} />)
            : ''}
          <AddEmojiButton />
        </div>
      </div>
    </div>
  ) : (
    <div className={`${styles.messageLayout} ${styles.messageLayoutOwner}`}>
      <div
        className={`${styles.messageContainer} ${styles.messageContainerOwner}`}>
        <p className={styles.authorName}>{name}</p>
        <p className={styles.message}>{message}</p>
        <p className={styles.messageTime}>{time}</p>
        <div className={styles.emojiContainer}>
          {emojis && emojis?.length > 0
            ? emojis.map(emoji => <EmojiButton key={emoji.id} emoji={emoji} />)
            : ''}
        </div>
      </div>
      <img className={styles.avatar} src={avatar} alt="Аватар" />
    </div>
  );
};
