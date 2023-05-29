import { ReactNode, InputHTMLAttributes, useRef } from 'react';
import cn from 'classnames';
import styles from './input.module.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inlineTitle: boolean;
  errorMessage?: string;
  deleteSymbol?: string | ReactNode;
}

export const Input = (props: InputProps) => {
  const {
    value,
    title,
    deleteSymbol,
    errorMessage,
    inlineTitle,
    ...otherProps
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  // Временная заглушка
  const handleClear = () => {
    // @ts-ignore
    inputRef.current.value = '';
  };

  return (
    <div className={styles.container}>
      <label className={cn({ [styles.warning]: errorMessage?.length })}>
        <input
          {...otherProps}
          className={cn(styles.input, { [styles.textRight]: inlineTitle })}
          ref={inputRef}
        />
        <span className={cn(styles.title, { [styles.labelUp]: !inlineTitle })}>
          {title}
        </span>
        {errorMessage && (
          <span className={styles.errorMessage}>{errorMessage}</span>
        )}
        {deleteSymbol && (
          <button onClick={handleClear} className={styles.clear}>
            {deleteSymbol}
          </button>
        )}
      </label>
    </div>
  );
};
