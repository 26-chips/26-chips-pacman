import { ReactNode, InputHTMLAttributes, useRef } from 'react';
import cn from 'classnames';
import styles from './input.module.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inlineTitle?: boolean;
  errorMessage?: string;
  showDeleteSymbol?: boolean;
  deleteSymbol?: string | ReactNode;
}

export const Input = (props: InputProps) => {
  const {
    title,
    showDeleteSymbol = true,
    deleteSymbol = ' × ',
    errorMessage,
    inlineTitle,
    ...otherProps
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className={styles.container}>
      <label className={cn({ [styles.warning]: errorMessage })}>
        <input
          {...otherProps}
          title={title}
          className={cn(styles.input, { [styles.textRight]: inlineTitle })}
          ref={inputRef}
        />
        <span className={cn(styles.title, { [styles.labelUp]: !inlineTitle })}>
          {title}
        </span>
        {errorMessage && (
          <span className={styles.errorMessage}>{errorMessage}</span>
        )}
        {showDeleteSymbol && (
          <button onClick={handleClear} className={styles.clear} type="button">
            {deleteSymbol}
          </button>
        )}
      </label>
    </div>
  );
};
