import { ChangeEvent, InputHTMLAttributes, useState } from 'react';
import cn from 'classnames';
import styles from './textarea.module.scss';

export interface TextareaProps
  extends InputHTMLAttributes<HTMLTextAreaElement> {
  allowedCharactersNumber: number;
  errorMessage?: string;
}

export const Textarea = (props: TextareaProps) => {
  const { errorMessage, allowedCharactersNumber, ...otherProps } = props;

  const [val, setValue] = useState('');
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <div
      className={cn(styles.container, {
        [styles.warning]: errorMessage?.length,
      })}>
      <textarea
        {...otherProps}
        className={styles.textarea}
        onChange={handleChange}></textarea>
      <div className={styles.counter}>
        <span>
          {val.length}/{allowedCharactersNumber}
        </span>
      </div>
      <span className={styles.errorMessage}>{errorMessage}</span>
    </div>
  );
};
