import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Menu } from 'components';

export const Layout = () => (
  <div>
    <Menu />
    <Suspense fallback="Loading...">
      <Outlet />
    </Suspense>
  </div>
);
