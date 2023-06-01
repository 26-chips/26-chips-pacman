import { FunctionComponent, useState } from 'react';
import styles from './forumPage.module.scss';
import { ForumTopicType } from './types';
import { ForumTopicsTable } from './components/forumTopicsTable/forumTopicsTable';
import violetLogo from '../../assets/icons/violet-logo-image.svg';
import orangeLogo from '../../assets/icons/orange-logo-image.svg';
import iconPlus from '../../assets/icons/icon-plus.svg';
import { CreateTopic } from './components/createTopic/createTopic';

const topicsList: ForumTopicType[] = [
  {
    id: 0,
    title: 'Самый популярные игры 20 века',
    numberOfTopic: 1,
    numberOfComments: 2,
    numberOfParticipants: 3,
  },
  {
    id: 1,
    title: 'Технологии',
    numberOfTopic: 200,
    numberOfComments: 300,
    numberOfParticipants: 500,
  },
  {
    id: 2,
    title: 'Самый популярные игры 20 века',
    numberOfTopic: 1,
    numberOfComments: 2,
    numberOfParticipants: 3,
  },
  {
    id: 3,
    title: 'Технологии',
    numberOfTopic: 200,
    numberOfComments: 300,
    numberOfParticipants: 500,
  },
  {
    id: 4,
    title: 'Самый популярные игры 20 века',
    numberOfTopic: 1,
    numberOfComments: 2,
    numberOfParticipants: 3,
  },
  {
    id: 5,
    title: 'Технологии',
    numberOfTopic: 200,
    numberOfComments: 300,
    numberOfParticipants: 500,
  },
  {
    id: 6,
    title: 'Самый популярные игры 20 века',
    numberOfTopic: 1,
    numberOfComments: 2,
    numberOfParticipants: 3,
  },
  {
    id: 7,
    title: 'Технологии',
    numberOfTopic: 200,
    numberOfComments: 300,
    numberOfParticipants: 500,
  },
  {
    id: 8,
    title: 'Самый популярные игры 20 века',
    numberOfTopic: 1,
    numberOfComments: 2,
    numberOfParticipants: 3,
  },
  {
    id: 9,
    title: 'Технологии',
    numberOfTopic: 200,
    numberOfComments: 300,
    numberOfParticipants: 500,
  },
];

const ForumPage = () => {
  const [createTopic, setCreateTopic] = useState(false);

  const handleCancelCreateTopic = () => {
    setCreateTopic(false);
  };

  return (
    <div className={styles.forum}>
      <h1 className={styles.title}>forum</h1>
      <div className={styles.line}></div>
      {
        createTopic ?
          <CreateTopic handleCancelCreateTopic={handleCancelCreateTopic} />
          :
          <div className={styles.tableContainer}>
            <button onClick={() => setCreateTopic(true)} className={styles.buttonAddTheme}>
              <img src={iconPlus} alt="Иконка добавить" />
              <p className={styles.buttonTitle}>Создать новую тему</p>
            </button>
            <ForumTopicsTable topicsList={topicsList} />
          </div>
      }
      <img
        className={`${styles.logo} ${styles.orangeLogo}`}
        src={orangeLogo}
        alt="logo"
      />
      <img className={styles.logo} src={violetLogo} alt="logo" />
    </div>
  );
};

export default ForumPage as FunctionComponent;
