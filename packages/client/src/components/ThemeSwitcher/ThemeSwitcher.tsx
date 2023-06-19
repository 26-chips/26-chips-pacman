import React, { useState } from 'react';
import styles from './themeSwitcher.module.scss';
import { Switch } from '../Switch';

export const ThemeSwitcher = () => {
  const [isDark, toggleTheme] = useState(false);

  const toggle = () => {
    toggleTheme(!isDark);
  };
  return (
    <div className={styles.theme}>
      <span>{isDark ? 'Темная тема' : 'Светлая тема'}</span>
      <Switch checked={isDark} onChange={toggle} />
    </div>
  );
};
