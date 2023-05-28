import { InputHTMLAttributes } from 'react';
import styles from './textarea.module.scss';

export interface TextareaProps
  extends InputHTMLAttributes<HTMLTextAreaElement> {
  allowedCharactersNumber: number;
  errorMessage?: string;
}

export const Textarea = (props: TextareaProps) => {
  const { title, value, placeholder, errorMessage, allowedCharactersNumber } =
    props;

  return (
    <div className={styles.container}>
      <textarea
        value={value}
        title={title}
        className={styles.textarea}
        placeholder={placeholder}></textarea>
      <div className={styles.counter}>
        <span>
          {value ? value.toString().length : 0}/{allowedCharactersNumber}
        </span>
      </div>
      <span className="helper">{errorMessage}</span>
    </div>
  );
};
