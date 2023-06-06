import React, { FunctionComponent, useState } from 'react';
import styles from './mainPage.module.scss';
import { Button, Switch } from 'components';
import Logo from 'assets/img/Mainpage.svg';
import { ROUTES } from 'router';
import { Link } from 'react-router-dom';

const MainPage = () => {
  const [isDark, toggleTheme] = useState(false);
  const toggle = () => {
    toggleTheme(!isDark);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>{isDark ? 'Темная тема' : 'Светлая тема'}</span>
        <Switch checked={isDark} onChange={toggle} />
      </div>

      <div className={styles.imageContainer}>
        <img
          src={Logo}
          alt="Main page logo"
          title="Main page logo"
          className={styles.image}
        />

        <h1>IvanovI</h1>

        <div className={styles.buttons}>
          <Link to={ROUTES.GAME}>
            <Button>Начнем?</Button>
          </Link>
          <Link to={ROUTES.PROFILE}>
            <Button thema="transparent">В личный кабинет</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainPage as FunctionComponent;
