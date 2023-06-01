import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './layout.module.scss';
import { Menu } from 'components';

export const Layout = () => (
  <div className={styles.layout}>
    <Menu />
    <Suspense fallback="Loading...">
      <div className={styles.content}>
        <Outlet />
      </div>
    </Suspense>
  </div>
);
