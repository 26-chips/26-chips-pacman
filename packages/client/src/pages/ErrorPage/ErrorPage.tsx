import { FunctionComponent } from 'react';
import styles from './errorPage.module.scss';
import { Button } from 'components';
import { Images } from 'assets/img';
import { useNavigate } from 'react-router-dom';

export interface ErrorPageProps {
  statusCode: string;
  errorText: string;
  image: string;
}

const ErrorPage = ({
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
      </div>
    </div>
  );
};

export default ErrorPage as FunctionComponent;
