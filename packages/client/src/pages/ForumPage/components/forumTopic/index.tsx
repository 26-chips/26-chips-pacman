import styles from './forumTopic.module.scss';
import { ForumTopicType } from '../../types';

export const ForumTopic = (props: ForumTopicType) => {
  const {
    title,
    numberOfTopic = 0,
    numberOfComments = 0,
    numberOfParticipants = 0,
  } = props;

  return (
    <div className={styles.wrapper}>
      <div className={styles.topic}>
        <p className={styles.title}>{title}</p>
        <p className={`${styles.number} ${styles.header}`}>{numberOfTopic}</p>
        <p className={styles.header}>{numberOfComments}</p>
        <p className={styles.header}>{numberOfParticipants}</p>
      </div>
    </div>
  );
};
