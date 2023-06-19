import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from 'router';
import { Loader } from 'components';
import { useFetchUserQuery } from 'api';

type PrivateRouteProps = {
  children: ReactNode;
};

export const PrivateRoute = ({ children }: PrivateRouteProps): JSX.Element => {
  const { data: user, isLoading } = useFetchUserQuery();

  return isLoading ? (
    <Loader />
  ) : user ? (
    <>{children}</>
  ) : (
    <Navigate to={ROUTES.SIGNIN} />
  );
};
