import { Modal, ModalProps } from '../Modal';
import { EndGameComponent } from './EndGameComponent';

export interface EndGameComponentProps {
  username: string;
  score: string;
  className?: string;
  elapsedTimeSec: number | string;
}

export const EndGameScreen = ({
  username,
  score,
  elapsedTimeSec,
  show,
  onClose,
  ...otherProps
}: EndGameComponentProps & Omit<ModalProps, 'children'>) => {
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
