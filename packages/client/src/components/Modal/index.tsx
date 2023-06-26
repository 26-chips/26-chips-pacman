import { MouseEvent, ReactNode } from 'react';
import cn from 'classnames';
import CloseIcon from 'assets/icons/CloseIcon.svg';

import styles from './styles.module.scss';

interface ModalProps {
  children: ReactNode;
  className?: string;
  onClose: () => void;
}

export const Modal = ({
  onClose,
  children,
  className,
}: ModalProps): JSX.Element => (
  <div className={styles.modal} onClick={onClose}>
    <div
      className={cn(styles.content, className)}
      onClick={(e: MouseEvent) => e.stopPropagation()}>
      {children}
      <button className={styles.close} onClick={onClose}>
        <img src={CloseIcon} alt="close icon" />
      </button>
    </div>
  </div>
);
