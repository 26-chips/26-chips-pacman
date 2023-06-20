import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styles from './layout.module.scss';
import { Header, Loader } from 'components';
import { ROUTES } from '../../router';

export const Layout = () => {
  const location = useLocation();

  const isHeaderShowing = () =>
    location.pathname !== ROUTES.MAIN &&
    location.pathname !== ROUTES.SIGNIN &&
    location.pathname !== ROUTES.SIGNUP;

  return (
    <div className={styles.layout}>
      {isHeaderShowing() ? <Header /> : ''}
      <Suspense fallback={<Loader />}>
        <div className={styles.content}>
          <Outlet />
        </div>
      </Suspense>
    </div>
  );
};
