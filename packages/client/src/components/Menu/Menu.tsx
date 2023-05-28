import { NavLink } from 'react-router-dom';

import { ROUTES } from 'router';

import styles from './menu.module.scss';

const getActiveStyles = ({ isActive }: { isActive: boolean }) =>
  isActive ? styles.active : undefined;

export const Menu = () => (
  <nav className={styles.menu}>
    <ul className={styles.list}>
      <li>
        <NavLink to={ROUTES.MAIN} className={getActiveStyles}>
          Главная страница
        </NavLink>
      </li>
      <li>
        <NavLink to={ROUTES.GAME} className={getActiveStyles}>
          Игра
        </NavLink>
      </li>
      <li>
        <NavLink to={ROUTES.LEADERBOARD} className={getActiveStyles}>
          Лидерборд
        </NavLink>
      </li>
      <li>
        <NavLink to={ROUTES.FORUM} className={getActiveStyles}>
          Форум
        </NavLink>
      </li>
      <li>
        <NavLink to={ROUTES.PROFILE} className={getActiveStyles}>
          Профиль
        </NavLink>
      </li>
    </ul>
  </nav>
);
