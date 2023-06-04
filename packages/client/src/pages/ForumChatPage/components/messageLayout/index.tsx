import styles from './messageLayout.module.scss';
import { AddEmojiButton } from '../addEmojiButton';
import { EmojiButton } from '../emojiButton';
import cn from 'classnames';
import { MessageLayoutType } from '../../types';

export const MessageLayout = (props: MessageLayoutType) => {
  const { avatar, message, time, name, emojis, isInterlocutor = true } = props;

  return (
    <div
      className={cn(styles.messageLayout, {
        [styles.messageLayoutOwner]: !isInterlocutor,
      })}>
      {isInterlocutor ? (
        <img className={styles.avatar} src={avatar} alt="Аватар" />
      ) : (
        ''
      )}
      <div
        className={cn(styles.messageContainer, {
          [styles.messageContainerOwner]: !isInterlocutor,
        })}>
        <p className={styles.authorName}>{name}</p>
        <p className={styles.message}>{message}</p>
        <p className={styles.messageTime}>{time}</p>
        <div className={styles.emojiContainer}>
          {emojis && emojis.length > 0
            ? emojis.map(({ emoji, number, id }) => (
                <EmojiButton key={id} emoji={emoji} number={number} />
            ))
            : ''}
          <AddEmojiButton />
        </div>
      </div>
      {!isInterlocutor ? (
        <img className={styles.avatar} src={avatar} alt="Аватар" />
      ) : (
        ''
      )}
    </div>
  );
};
