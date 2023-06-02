import styles from './messageLayout.module.scss';
import { AddEmojiButton } from '../addEmojiButton';
import { EmojiButton } from '../emojiButton';
import { EmojiType } from '../../types';
import cn from 'classnames';

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

  return (
    <div
      className={cn(styles.messageLayout, {
        [styles.messageLayoutOwner]: !interlocutor,
      })}>
      {interlocutor ? (
        <img className={styles.avatar} src={avatar} alt="Аватар" />
      ) : (
        ''
      )}
      <div
        className={cn(styles.messageContainer, {
          [styles.messageContainerOwner]: !interlocutor,
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
      {!interlocutor ? (
        <img className={styles.avatar} src={avatar} alt="Аватар" />
      ) : (
        ''
      )}
    </div>
  );
};
