import styles from './startPage.module.scss';
import { Button } from 'components';
import Logo from 'assets/img/Mainpage.svg';
import { ROUTES } from 'router';
import { Link } from 'react-router-dom';
import { useFetchUserQuery } from 'api';
import { formUserName } from 'utils/helpers';

export const StartPage = () => {
  const { data: user } = useFetchUserQuery();

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img
          src={Logo}
          alt="Start page logo"
          title="Start page logo"
          className={styles.image}
        />

        <h1>{formUserName(user, 'New Player')}</h1>

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
