import styles from './endGameComponent.module.scss';
import { Button } from '../Button';
import { Link } from 'react-router-dom';
import { ROUTES } from 'router';
import cn from 'classnames';

export interface EndGameComponentProps {
  username: string;
  score: number;
  className?: string;
  elapsedTimeSec: number | string;
}

export const EndGameComponent = ({
  username,
  score,
  className,
  elapsedTimeSec,
}: EndGameComponentProps): JSX.Element => {
  return (
    <div className={cn(styles.container, className)}>
      <h1>{username}</h1>
      <h1>Ваши результаты</h1>
      <h1 className={styles.blue}>{score}</h1>
      <h3 className={styles.blue}>
        {new Date(Number(elapsedTimeSec) * 1000)
          .toISOString()
          .substring(11, 19)}
      </h3>
      <div className={styles.buttonContainer}>
        <a className={styles.link} href={ROUTES.GAME}>
          <Button>Начать сначала</Button>
        </a>
        <Link className={styles.link} to={ROUTES.MAIN}>
          <Button thema="transparent">На главную</Button>
        </Link>
      </div>
    </div>
  );
};
