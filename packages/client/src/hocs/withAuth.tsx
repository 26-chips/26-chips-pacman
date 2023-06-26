import { ComponentType } from 'react';
import { useFetchUserQuery } from 'api';
import { Loader } from 'components';

export function withAuth<T>(Component: ComponentType<T>) {
  function WithAuth(props: T) {
    const { data: user, isLoading } = useFetchUserQuery();

    return isLoading ? <Loader /> : <Component {...(props as T)} user={user} />;
  }

  WithAuth.displayName = `withAuth(${Component.displayName || Component.name})`;

  return WithAuth;
}
