import styles from './errorPage.module.scss';
import { Button, Link } from 'components';
import { Images } from 'assets/img';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'router';

export interface ErrorPageProps {
  statusCode: string;
  errorText: string;
  image: string;
}

export const ErrorPage = ({
  statusCode = '404',
  errorText = 'Упс!\nКажется, такой страницы не существует',
  image = 'Green',
}: Omit<ErrorPageProps, 'children'>): JSX.Element => {
  const nav = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.relativeContainer}>
        <img
          src={Images[image]}
          alt="Error page logo"
          title="Error page logo"
          className={styles.image}
        />

        <h1 className={styles.errorCode}>{statusCode}</h1>

        <p className={styles.pre}>{errorText}</p>
        <Button className={styles.button} onClick={() => nav(-1)}>
          Назад
        </Button>
        <Link to={ROUTES.MAIN}>На главную</Link>
      </div>
    </div>
  );
};
