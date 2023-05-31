import { InputHTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './textarea.module.scss';

export interface TextareaProps
  extends InputHTMLAttributes<HTMLTextAreaElement> {
  errorMessage?: string;
}

export const Textarea = (props: TextareaProps) => {
  const {
    errorMessage,
    value = '',
    className,
    maxLength = 50,
    ...otherProps
  } = props;

  return (
    <div
      className={cn(styles.container, {
        [styles.warning]: errorMessage?.length,
      })}>
      <textarea
        {...otherProps}
        value={value}
        maxLength={maxLength}
        className={cn(styles.textarea, className)}
      />
      <div className={styles.counter}>
        <span>
          {value.toString().length}/{maxLength}
        </span>
      </div>
      <span className={styles.errorMessage}>{errorMessage}</span>
    </div>
  );
};
