import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from 'router';
import { withAuth } from 'hocs';
import type { User } from 'app/types';

type PrivateRouteProps = {
  children: ReactNode;
  user?: User;
};

export const PrivateRoute = withAuth(
  ({ children, user }: PrivateRouteProps): JSX.Element =>
    user ? <>{children}</> : <Navigate to={ROUTES.SIGNIN} />
);
