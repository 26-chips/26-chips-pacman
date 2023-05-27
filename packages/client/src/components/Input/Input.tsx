import React, { ReactNode, useState } from 'react';
import cn from 'classnames';
import styles from './input.module.scss';

type InputProps = {
  value: string;
  label: string;
  isLabelStatic: boolean;
  isValid?: boolean;
  errorMessage?: string;
  deleteSymbol?: string | ReactNode;
  validateFn?: (s: string) => boolean;
};

export const Input = (props: InputProps) => {
  const {
    value,
    label,
    validateFn,
    deleteSymbol,
    errorMessage,
    isLabelStatic,
  } = props;

  const [val, setValue] = useState(value);
  const [isValid, setIsValid] = useState(true);

  const handleClear = () => {
    setValue('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (validateFn) {
      setIsValid(validateFn(e.target.value));
    }
  };

  return (
    <div className={cn(styles.inputContainer)}>
      <label
        className={cn(styles.inputUnderlined, { [styles.danger]: !isValid })}>
        <input
          value={val}
          title={label}
          onBlur={handleBlur}
          onInput={handleChange}
          className={cn({ [styles.textRight]: isLabelStatic })}></input>
        <span
          className={cn(styles.inputLabel, {
            [styles.hide]: val.length > 25,
            [styles.inputLabelUp]: val.length > 0 && !isLabelStatic,
          })}>
          {label}
        </span>
        <span className={cn(styles.helper)}>{errorMessage}</span>
        <span className={cn(styles.inputClear)} onClick={handleClear}>
          {deleteSymbol || ' '}
        </span>
      </label>
    </div>
  );
};
