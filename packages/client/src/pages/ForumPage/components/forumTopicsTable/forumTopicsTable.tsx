import styles from './forumTopicsTable.module.scss';
import { ForumTopicType } from '../../types';
import { ForumTopic } from '../forumTopic/forumTopic';

interface ForumTopicsTableProps {
  topicsList: ForumTopicType[];
}

export const ForumTopicsTable = (props: ForumTopicsTableProps) => {
  const { topicsList = [] } = props;

  return (
    <div className={styles.table}>
      <div className={styles.headers}>
        <p className={styles.forums}>Форумы</p>
        <p className={`${styles.header} ${styles.themes}`}>Темы</p>
        <p className={styles.header}>Комментарии</p>
        <p className={styles.header}>Участники</p>
      </div>
      {topicsList.map(topic => (
        <ForumTopic
          title={topic.title}
          numberOfTopic={topic.numberOfTopic}
          numberOfComments={topic.numberOfComments}
          numberOfParticipants={topic.numberOfParticipants}
        />
      ))}
    </div>
  );
};
