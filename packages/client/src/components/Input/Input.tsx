import type { InputHTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './input.module.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inlineTitle?: boolean;
  errorMessage?: string;
  showDeleteSymbol?: boolean;
  name: string;
  setValue: (field: string, value: unknown) => Promise<void>;
}

export const Input = ({
  title,
  showDeleteSymbol = true,
  errorMessage,
  inlineTitle,
  setValue,
  name,
  ...otherProps
}: InputProps) => {
  const handleClear = () => {
    setValue(name, '');
  };

  return (
    <div className={styles.container}>
      <label className={cn({ [styles.warning]: errorMessage })}>
        <input
          {...otherProps}
          name={name}
          title={title}
          className={cn(styles.input, { [styles.textRight]: inlineTitle })}
        />
        <span className={cn(styles.title, { [styles.labelUp]: !inlineTitle })}>
          {title}
        </span>
        {errorMessage && (
          <span className={styles.errorMessage}>{errorMessage}</span>
        )}
        {showDeleteSymbol && (
          <button onClick={handleClear} className={styles.clear} type="button">
            <div className={styles.cross} />
          </button>
        )}
      </label>
    </div>
  );
};
