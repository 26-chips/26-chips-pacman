import { ButtonHTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  thema?: 'default' | 'light' | 'transparent';
  loading?: boolean;
}

export const Button = (props: ButtonProps) => {
  const {
    className,
    thema = 'default',
    children,
    loading,
    ...restProps
  } = props;

  return (
    <button
      className={cn(`${styles.button} ${className} ${styles[thema]}`, {
        [styles.loading]: loading,
      })}
      {...restProps}>
      {loading ? 'Loading...' : children}
    </button>
  );
};
