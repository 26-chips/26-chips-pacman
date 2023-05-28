import { ButtonHTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  thema?: 'default' | 'light';
  width?: number;
  height?: number;
  loading?: boolean;
}

export const Button = (props: ButtonProps) => {
  const {
    thema = 'default',
    width,
    height,
    children,
    loading,
    ...restProps
  } = props;

  return (
    <button
      className={cn(styles.button, {
        [styles.light]: thema === 'light',
        [styles.loading]: loading,
      })}
      style={{
        width: width && `${width}px`,
        height: height && `${height}px`,
      }}
      {...restProps}>
      {loading ? 'Loading...' : children}
    </button>
  );
};
