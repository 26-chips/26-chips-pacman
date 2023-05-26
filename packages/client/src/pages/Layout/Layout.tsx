import { Outlet } from 'react-router-dom';

import { Menu } from 'components';

export const Layout = () => (
  <div>
    <Menu />
    <Outlet />
  </div>
);
