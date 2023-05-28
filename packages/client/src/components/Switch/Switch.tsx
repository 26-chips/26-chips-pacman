import React, { InputHTMLAttributes, MouseEvent, useState } from 'react';
import cn from 'classnames';
import styles from './switch.module.scss';

export const Switch = (props: InputHTMLAttributes<HTMLInputElement>) => {
  const { defaultChecked, ...otherProps } = props;
  const [isChecked, setIsChecked] = useState(defaultChecked);

  // Заглушка для изменеия состояния checked
  const toggleCheckbox = (e: MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setIsChecked(!isChecked);
  };

  return (
    <div className={styles.container}>
      <label className={cn(styles.switch, { [styles.checked]: isChecked })}>
        <input
          {...otherProps}
          defaultChecked={defaultChecked}
          type="checkbox"
          className={styles.input}
          onClick={toggleCheckbox}
        />
        <span className={styles.slider} />
      </label>
    </div>
  );
};
