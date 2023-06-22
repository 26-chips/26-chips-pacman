import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from 'router';
import { withAuth } from 'hocs';
import type { User } from 'app/types';

type AuthRouteProps = {
  children: ReactNode;
  user?: User;
};

export const AuthRoute = withAuth(
  ({ children, user }: AuthRouteProps): JSX.Element =>
    user ? <Navigate to={ROUTES.START} /> : <>{children}</>
);
