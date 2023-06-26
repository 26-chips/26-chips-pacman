import { Modal } from '../Modal';
import { EndGameComponent } from './EndGameComponent';

export interface EndGameComponentProps {
  username: string;
  score: string;
  show: boolean;
  onClose: () => void;
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
}: EndGameComponentProps) =>
  show ? (
    <Modal {...otherProps} onClose={onClose}>
      <EndGameComponent
        username={username}
        elapsedTimeSec={elapsedTimeSec}
        score={score}
      />
    </Modal>
  ) : null;
