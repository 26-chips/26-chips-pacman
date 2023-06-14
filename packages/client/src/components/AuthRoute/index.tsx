import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from 'router';
import { useFetchUserQuery } from 'api';
import { Loader } from 'components';

type AuthRouteProps = {
  children: ReactNode;
};

export const AuthRoute = ({ children }: AuthRouteProps): JSX.Element => {
  const { data: user, isLoading } = useFetchUserQuery();

  return isLoading ? (
    <Loader />
  ) : user ? (
    <Navigate to={ROUTES.START} />
  ) : (
    <>{children}</>
  );
};
