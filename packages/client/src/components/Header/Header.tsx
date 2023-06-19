import { NavLink, useLocation } from 'react-router-dom';
import { ROUTES } from 'router';
import styles from './header.module.scss';
import arrowLeft from 'assets/icons/arrow-left.svg';
import { Dropdown } from '../Dropdown';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';

export const Header = () => {
  const getActiveStyles = ({ isActive }: { isActive: boolean }) =>
    isActive ? styles.linkActive : styles.link;

  const location = useLocation();

  const showToGameButton = () =>
    location.pathname === ROUTES.GAME || location.pathname === ROUTES.START;

  return (
    <>
      <header className={styles.header}>
        {showToGameButton() ? (
          <div></div>
        ) : (
          <button className={styles.backButton}>
            <img src={arrowLeft} alt="Назад" />
            <NavLink to={ROUTES.START} className={styles.link}>
              К игре
            </NavLink>
          </button>
        )}
        <div className={styles.container}>
          <div className={styles.switchContainer}>
            <ThemeSwitcher />
          </div>
          <Dropdown
            title="Меню"
            variants={[
              <NavLink to={ROUTES.START} className={getActiveStyles}>
                Страница игры
              </NavLink>,
              <NavLink to={ROUTES.LEADERBOARD} className={getActiveStyles}>
                Страница рейтинга
              </NavLink>,
              <NavLink to={ROUTES.FORUM} className={getActiveStyles}>
                Форум
              </NavLink>,
              <NavLink to={ROUTES.PROFILE} className={getActiveStyles}>
                Личный кабинет
              </NavLink>,
              <span
                style={{ color: 'red' }}
                onClick={() => console.log('Выход')}>
                Выход
              </span>,
            ]}
            defaultActiveItem={0}
          />
        </div>
      </header>
    </>
  );
};
