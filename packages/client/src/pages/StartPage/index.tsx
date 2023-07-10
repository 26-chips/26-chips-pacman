import styles from './startPage.module.scss';
import { Button } from 'components';
import Logo from 'assets/img/Mainpage.svg';
import { Link } from 'react-router-dom';
import { useFetchUserQuery } from 'api';
import { formUserName } from 'utils/helpers';

export const StartPage = () => {
  const { data: user } = useFetchUserQuery();

  const fetchUser = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/user?id=1', {
        credentials: 'include',
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLeaderbord = async () => {
    try {
      const response = await fetch('/api/v2/auth/user', {
        credentials: 'include',
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const auth = async () => {
    try {
      const response = await fetch('/api/v2/auth/signin', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login: 'Futuringer523', password: '324334aA' }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <button onClick={fetchUser}>BD</button>
      <button onClick={fetchLeaderbord}>USER</button>
      <button onClick={auth}>AUTH</button>
      <div className={styles.imageContainer}>
        <img
          src={Logo}
          alt="Start page logo"
          title="Start page logo"
          className={styles.image}
        />

        <h1>{formUserName(user, 'New Player')}</h1>

        <div className={styles.buttons}>
          <Link to={'/game'}>
            <Button>Начнем?</Button>
          </Link>
          <Link to={'/profile'}>
            <Button thema="transparent">В личный кабинет</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
