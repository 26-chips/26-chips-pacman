import { FunctionComponent, useState } from 'react';
import cn from 'classnames';
import styles from './forumPage.module.scss';
import { ForumTopicType } from './types';
import { ForumTopicsTable, CreateTopic } from './components';
import violetLogo from 'assets/icons/violet-logo-image.svg';
import orangeLogo from 'assets/icons/orange-logo-image.svg';

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

  const handleChangeCreateTopic = () => {
    setCreateTopic(!createTopic);
  };

  return (
    <div className={styles.forum}>
      <div className={styles.forumHeader}>
        <h1 className={styles.title}>forum</h1>
        <div className={styles.line}></div>
      </div>
      {createTopic ? (
        <CreateTopic handleChangeCreateTopic={handleChangeCreateTopic} />
      ) : (
        <ForumTopicsTable
          topicsList={topicsList}
          handleChangeCreateTopic={handleChangeCreateTopic}
        />
      )}
      <img
        className={cn(styles.logo, styles.orangeLogo)}
        src={orangeLogo}
        alt="logo"
      />
      <img className={styles.logo} src={violetLogo} alt="logo" />
    </div>
  );
};

export default ForumPage as FunctionComponent;
