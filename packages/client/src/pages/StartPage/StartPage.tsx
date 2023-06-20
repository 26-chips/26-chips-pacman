import { FunctionComponent, useMemo } from 'react';
import styles from './startPage.module.scss';
import { Button } from 'components';
import Logo from 'assets/img/Mainpage.svg';
import { ROUTES } from 'router';
import { Link } from 'react-router-dom';
import { useFetchUserQuery } from 'api';

const StartPage = () => {
  const { data: user } = useFetchUserQuery();

  const displayedName = useMemo(() => {
    return user?.display_name
      ? user?.display_name
      : `${user?.first_name} ${user?.second_name}`;
  }, [user]);

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img
          src={Logo}
          alt="Start page logo"
          title="Start page logo"
          className={styles.image}
        />

        <h1>{user ? displayedName : 'New Player'}</h1>

        <div className={styles.buttons}>
          <Link to={ROUTES.GAME}>
            <Button>Начнем?</Button>
          </Link>
          <Link to={ROUTES.PROFILE}>
            <Button thema="transparent">В личный кабинет</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StartPage as FunctionComponent;
