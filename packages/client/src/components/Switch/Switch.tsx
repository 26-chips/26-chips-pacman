import React, { InputHTMLAttributes, MouseEvent, useState } from 'react';
import cn from 'classnames';
import styles from './switch.module.scss';

export const Switch = (props: InputHTMLAttributes<HTMLInputElement>) => {
  const { checked, ...otherProps } = props;

  // Заглушка для изменения состояния checked
  const [isChecked, setIsChecked] = useState(checked);
  const toggleCheckbox = (e: MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setIsChecked(!isChecked);
  };

  return (
    <div className={styles.container}>
      <label className={cn(styles.switch, { [styles.checked]: isChecked })}>
        <input
          {...otherProps}
          checked={isChecked}
          defaultChecked={checked}
          type="checkbox"
          className={styles.input}
          onClick={toggleCheckbox}
        />
        <span className={styles.slider} />
      </label>
    </div>
  );
};
