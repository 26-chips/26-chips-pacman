import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './layout.module.scss';
import { Menu, Loader } from 'components';

export const Layout = () => (
  <div className={styles.layout}>
    <Menu />
    <Suspense fallback={<Loader />}>
      <div className={styles.content}>
        <Outlet />
      </div>
    </Suspense>
  </div>
);
