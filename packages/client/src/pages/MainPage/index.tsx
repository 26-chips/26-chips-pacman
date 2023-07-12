import { useEffect } from 'react';
import styles from './mainPage.module.scss';
import { Button } from 'components';
import { Link } from 'react-router-dom';
import { ROUTES } from 'router';
import welcomeToPacman from 'assets/img/welcome-to-pacman.svg';
import { Developer } from './components';
import avatar1 from 'assets/img/developersAvatars/avatar1.svg';
import avatar2 from 'assets/img/developersAvatars/avatar2.svg';
import avatar3 from 'assets/img/developersAvatars/avatar3.svg';
import avatar4 from 'assets/img/developersAvatars/avatar4.svg';
import avatar5 from 'assets/img/developersAvatars/avatar5.svg';
import { DeveloperType } from './types';
import { useOAuthYandexMutation } from 'api';
import { OAUTH_REDIRECT_URL } from 'utils/consts';

const developersList: DeveloperType[] = [
  {
    avatar: avatar1,
    name: 'Kristina',
    githubName: 'kris-alexwa',
    githubLink: 'https://github.com/kris-alexwa',
  },
  {
    avatar: avatar2,
    name: 'Vladislav',
    githubName: 'Futuringer',
    githubLink: 'https://github.com/Futuringer',
  },
  {
    avatar: avatar3,
    name: 'Julia',
    githubName: 'juliastetskaya',
    githubLink: 'https://github.com/juliastetskaya',
  },
  {
    avatar: avatar4,
    name: 'Slava',
    githubName: 'Abricos78',
    githubLink: 'https://github.com/Abricos78',
  },
  {
    avatar: avatar5,
    name: 'Alexandr',
    githubName: 'gitnbrsp',
    githubLink: 'https://github.com/gitnbrsp',
  },
];

export const MainPage = () => {
  const [auth] = useOAuthYandexMutation();

  const authWithCode = async (code: string | null) => {
    if (code) {
      await auth({
        code,
        redirect_uri: OAUTH_REDIRECT_URL,
      });
    }
  };

  useEffect(() => {
    const data = new URLSearchParams(document.location.search);
    const code = data.get('code');

    if (code) {
      authWithCode(code);
    }
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <Link to={ROUTES.GAME} className={styles.link}>
          <Button thema="transparent">Начать без регистрации</Button>
        </Link>
        <Link to={ROUTES.SIGNIN} className={styles.signInLink}>
          <Button thema="light">Войти</Button>
        </Link>
        <Link to={ROUTES.SIGNUP} className={styles.link}>
          <Button>Зарегистрироваться</Button>
        </Link>
      </div>
      <img
        className={styles.welcome}
        src={welcomeToPacman}
        alt="welcome to pacman"
      />
      <p className={styles.welcomeDescription}>
        Данная игра была разработана в рамках курса{' '}
        <span className={styles.span}>Миддл фронтенд разработчик</span> от
        Я.Практикум.
      </p>
      <a
        href="https://github.com/26-chips/26-chips-pacman"
        target="_blank"
        className={styles.repositoryLink}>
        Наш github репозиторий
      </a>
      <p className={styles.developersTitle}>Разработчики игры:</p>
      <ul className={styles.developers}>
        {developersList.map(
          ({ avatar, name, githubName, githubLink }, index) => (
            <Developer
              key={index}
              avatar={avatar}
              name={name}
              githubName={githubName}
              githubLink={githubLink}
            />
          )
        )}
      </ul>
      <div className={styles.gameRules}>
        <h4 className={styles.rulesTitle}>Правила игры</h4>
        <p className={styles.rulesDescription}>
          Ваша задача — управляя Пакманом, съесть все точки в лабиринте, избегая
          встречи с привидениями, которые гоняются за вами. Зарегистрировавшись,
          вы сможете не только следить за своим рейтингом, но и за рейтингом
          других игроков, участвовать в форумах и создавать свои форумы на
          интересующие вас темы!
        </p>
      </div>
    </section>
  );
};
