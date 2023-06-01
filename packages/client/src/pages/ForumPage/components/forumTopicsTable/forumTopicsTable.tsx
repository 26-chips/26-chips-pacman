import styles from './forumTopicsTable.module.scss';
import { ForumTopicType } from '../../types';
import { ForumTopic } from '../forumTopic/forumTopic';
import { Link } from 'react-router-dom';
import { ROUTES } from 'router';
import iconPlus from '../../../../assets/icons/icon-plus.svg';

interface ForumTopicsTableProps {
  topicsList: ForumTopicType[];
  handleChangeCreateTopic: () => void;
}

export const ForumTopicsTable = (props: ForumTopicsTableProps) => {
  const { topicsList } = props;

  const handleCreateTopic = () => {
    props.handleChangeCreateTopic();
  };

  return (
    <div className={styles.tableContainer}>
      <button onClick={handleCreateTopic} className={styles.buttonAddTheme}>
        <img src={iconPlus} alt="Иконка добавить" />
        <p className={styles.buttonAddThemeTitle}>Создать новую тему</p>
      </button>
      <div className={styles.table}>
        <div className={styles.headers}>
          <p className={styles.forums}>Форумы</p>
          <p className={`${styles.header} ${styles.themes}`}>Темы</p>
          <p className={styles.header}>Комментарии</p>
          <p className={styles.header}>Участники</p>
        </div>
        {topicsList.map(topic => (
          <Link
            className={styles.link}
            key={topic.id}
            to={{ pathname: `${ROUTES.FORUM}/${topic.id}` }}>
            <ForumTopic
              title={topic.title}
              numberOfTopic={topic.numberOfTopic}
              numberOfComments={topic.numberOfComments}
              numberOfParticipants={topic.numberOfParticipants}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
