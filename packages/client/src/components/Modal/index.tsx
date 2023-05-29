import { MouseEvent, ReactNode } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import CloseIcon from 'assets/icons/CloseIcon.svg';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  show: boolean;
}

export const Modal = (props: ModalProps) => {
  const { onClose, children, show } = props;

  return (
    <div
      className={cn(styles.modal, { [styles.show]: show })}
      onClick={onClose}>
      <div
        className={styles.content}
        onClick={(e: MouseEvent) => e.stopPropagation()}>
        {children}
        <button className={styles.close} onClick={onClose}>
          <img src={CloseIcon} alt="close icon" />
        </button>
      </div>
    </div>
  );
};
