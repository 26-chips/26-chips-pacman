import { ComponentType } from 'react';
import { useFetchUserQuery } from 'api';

export function withAuth<T>(Component: ComponentType<T>) {
  function WithAuth(props: T) {
    const { data: user } = useFetchUserQuery();

    return <Component {...(props as T)} user={user} />;
  }

  WithAuth.displayName = `withAuth(${Component.displayName || Component.name})`;

  return WithAuth;
}
