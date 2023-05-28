import { InputHTMLAttributes } from 'react';
import styles from './checkbox.module.scss';

export const Checkbox = (props: InputHTMLAttributes<HTMLInputElement>) => {
  const { checked, ...otherProps } = props;

  return (
    <div className={styles.container}>
      <label className={styles.checkbox}>
        <input type="checkbox" {...otherProps} className={styles.input} />
        <span className={styles.checkmark} />
      </label>
    </div>
  );
};
