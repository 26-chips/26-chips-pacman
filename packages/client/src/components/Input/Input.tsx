import { ReactNode, InputHTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './input.module.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isLabelStatic: boolean;
  errorMessage?: string;
  deleteSymbol?: string | ReactNode;
}

export const Input = (props: InputProps) => {
  const { value, deleteSymbol, errorMessage, isLabelStatic, ...otherProps } =
    props;

  return (
    <div className={styles.container}>
      <label
        className={cn(styles.underlined, {
          [styles.warning]: errorMessage?.length,
        })}>
        <input
          {...otherProps}
          className={cn(styles.input, {
            [styles.textRight]: isLabelStatic,
          })}></input>
        <span
          className={cn(styles.title, {
            [styles.labelUp]: !isLabelStatic,
          })}>
          {otherProps.title}
        </span>
        {errorMessage ? (
          <span className={styles.errorMessage}>{errorMessage}</span>
        ) : undefined}
        {deleteSymbol ? (
          <span className={styles.clear}>{deleteSymbol}</span>
        ) : undefined}
      </label>
    </div>
  );
};
