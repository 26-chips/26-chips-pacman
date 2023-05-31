import React, { InputHTMLAttributes } from 'react';
import styles from './switch.module.scss';

export const Switch = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className={styles.container}>
      <label className={styles.switch}>
        <input {...props} type="checkbox" className={styles.input} />
        <span className={styles.slider} />
      </label>
    </div>
  );
};
