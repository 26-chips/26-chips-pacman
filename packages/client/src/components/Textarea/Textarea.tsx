import { ChangeEvent, InputHTMLAttributes, useState } from 'react';
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

  const [counter, setCounter] = useState(value.toString().length);
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCounter(e.target.value?.length);
  };

  return (
    <div
      className={cn(styles.container, {
        [styles.warning]: errorMessage?.length,
      })}>
      <textarea
        {...otherProps}
        maxLength={maxLength}
        className={cn(styles.textarea, className)}
        onChange={handleChange}></textarea>
      <div className={styles.counter}>
        <span>
          {counter}/{maxLength}
        </span>
      </div>
      <span className={styles.errorMessage}>{errorMessage}</span>
    </div>
  );
};
