import React, { FunctionComponent, useState } from 'react';
import styles from './mainpage.module.scss';
import { Button, Switch } from 'components';
import Logo from 'assets/img/Mainpage.svg';
import { ROUTES } from 'router';
import { Link } from 'react-router-dom';

const MainPage = () => {
  const [theme, toggleTheme] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>{theme ? 'Светлая тема' : 'Темная тема'}</span>
        <Switch
          checked={theme}
          onChange={() => {
            toggleTheme(!theme);
          }}></Switch>
        <div className={styles.menu}>
          <span>Меню</span>
        </div>
      </div>

      <img
        src={Logo}
        alt="Main page logo"
        title="Main page logo"
        className={styles.image}
      />

      <h1>IvanovI</h1>

      <div className={styles.buttons}>
        <Link to={ROUTES.GAME}>
          <Button type="submit">Начнем?</Button>
        </Link>
        <Link to={ROUTES.PROFILE}>
          <Button thema="transparent">В личный кабинет</Button>
        </Link>
      </div>
    </div>
  );
};

export default MainPage as FunctionComponent;
