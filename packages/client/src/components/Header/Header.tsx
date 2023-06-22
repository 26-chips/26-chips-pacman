import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from 'router';
import styles from './header.module.scss';
import arrowLeft from 'assets/icons/arrow-left.svg';
import { Dropdown } from '../Dropdown';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';
import { useLogoutMutation, apiSlice } from 'api';
import { useAppDispatch } from 'app/hooks';

export const Header = () => {
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveStyles = ({ isActive }: { isActive: boolean }) =>
    isActive ? styles.linkActive : styles.link;

  const showToGameButton = () =>
    location.pathname === ROUTES.GAME || location.pathname === ROUTES.START;

  const handleQuitClick = async () => {
    try {
      await logout().unwrap();
      dispatch(apiSlice.util.resetApiState());
      navigate(ROUTES.SIGNIN);
    } catch (e) {
      throw new Error((e as Error).message);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
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
              <span style={{ color: 'red' }} onClick={handleQuitClick}>
                Выход
              </span>,
            ]}
            defaultActiveItem={0}
          />
        </div>
      </div>
    </header>
  );
};
