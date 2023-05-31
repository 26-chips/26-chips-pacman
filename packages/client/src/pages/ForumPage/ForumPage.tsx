import { FunctionComponent } from 'react';
import styles from './forumPage.module.scss';
import { ForumTopicType } from './types';
import { ForumTopicsTable } from './components/forumTopicsTable/forumTopicsTable';
import violetLogo from '../../assets/icons/violet-logo-image.svg';
import orangeLogo from '../../assets/icons/orange-logo-image.svg';

const topicsList: ForumTopicType[] = [
  {
    title: 'Самый популярные игры 20 века',
    numberOfTopic: 1,
    numberOfComments: 2,
    numberOfParticipants: 3,
  },
  {
    title: 'Технологии',
    numberOfTopic: 200,
    numberOfComments: 300,
    numberOfParticipants: 500,
  },
  {
    title: 'Самый популярные игры 20 века',
    numberOfTopic: 1,
    numberOfComments: 2,
    numberOfParticipants: 3,
  },
  {
    title: 'Технологии',
    numberOfTopic: 200,
    numberOfComments: 300,
    numberOfParticipants: 500,
  },
  {
    title: 'Самый популярные игры 20 века',
    numberOfTopic: 1,
    numberOfComments: 2,
    numberOfParticipants: 3,
  },
  {
    title: 'Технологии',
    numberOfTopic: 200,
    numberOfComments: 300,
    numberOfParticipants: 500,
  },
  {
    title: 'Самый популярные игры 20 века',
    numberOfTopic: 1,
    numberOfComments: 2,
    numberOfParticipants: 3,
  },
  {
    title: 'Технологии',
    numberOfTopic: 200,
    numberOfComments: 300,
    numberOfParticipants: 500,
  },
  {
    title: 'Самый популярные игры 20 века',
    numberOfTopic: 1,
    numberOfComments: 2,
    numberOfParticipants: 3,
  },
  {
    title: 'Технологии',
    numberOfTopic: 200,
    numberOfComments: 300,
    numberOfParticipants: 500,
  },
];

const ForumPage = () => (
  <div className={styles.forum}>
    <h1 className={styles.title}>forum</h1>
    <div className={styles.line}></div>
    <ForumTopicsTable topicsList={topicsList} />
    <img
      className={`${styles.logo} ${styles.orangeLogo}`}
      src={orangeLogo}
      alt="logo"
    />
    <img className={styles.logo} src={violetLogo} alt="logo" />
  </div>
);

export default ForumPage as FunctionComponent;
