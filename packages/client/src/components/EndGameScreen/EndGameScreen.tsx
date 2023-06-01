import styles from './endgamescreen.module.scss';
import { Button } from '../Button';
import { Modal, ModalProps } from '../Modal';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../router';

export interface EndGameComponentProps {
  username: string;
  score: string;
  elapsedTimeSec: number | string;
}

function EndGameComponent({
  username,
  score,
  elapsedTimeSec,
}: EndGameComponentProps): JSX.Element {
  return (
    <div className={styles.container}>
      <h1>{username}</h1>
      <h1>Ваши результаты</h1>
      <h1 className={styles.blue}>{score}</h1>
      <h3 className={styles.blue}>
        {new Date(Number(elapsedTimeSec) * 1000)
          .toISOString()
          .substring(11, 19)}
      </h3>

      <NavLink to={ROUTES.GAME}>
        <Button>Начать сначала</Button>
      </NavLink>

      <NavLink to={ROUTES.MAIN}>
        <Button thema="transparent">На главную</Button>
      </NavLink>
    </div>
  );
}

export const EndGameScreen = ({
  username,
  score,
  elapsedTimeSec,
  show,
  onClose,
  ...otherProps
}: EndGameComponentProps & ModalProps) => {
  return (
    <Modal {...otherProps} onClose={onClose} show={show}>
      <EndGameComponent
        username={username}
        elapsedTimeSec={elapsedTimeSec}
        score={score}
      />
    </Modal>
  );
};
