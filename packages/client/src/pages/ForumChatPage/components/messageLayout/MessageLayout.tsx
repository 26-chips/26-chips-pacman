import styles from './messageLayout.module.scss';

interface MessageLayoutProps {
  avatar: string;
  message: string;
  time: string;
  name: string;
  interlocutor?: boolean;
}

export const MessageLayout = (props: MessageLayoutProps) => {
  const { avatar, message, time, name, interlocutor = true } = props;

  return interlocutor ? (
    <div className={styles.messageLayout}>
      <img className={styles.avatar} src={avatar} alt="Аватар" />
      <div className={styles.messageContainer}>
        <p className={styles.authorName}>{name}</p>
        <p className={styles.message}>{message}</p>
        <p className={styles.messageTime}>{time}</p>
      </div>
    </div>
  ) : (
    <div className={`${styles.messageLayout} ${styles.messageLayoutOwner}`}>
      <div
        className={`${styles.messageContainer} ${styles.messageContainerOwner}`}>
        <p className={styles.authorName}>{name}</p>
        <p className={styles.message}>{message}</p>
        <p className={styles.messageTime}>{time}</p>
      </div>
      <img className={styles.avatar} src={avatar} alt="Аватар" />
    </div>
  );
};
