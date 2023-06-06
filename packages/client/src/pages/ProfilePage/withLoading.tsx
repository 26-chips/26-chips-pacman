import { useState } from 'react';
import type { ComponentType, Dispatch, SetStateAction } from 'react';

export interface WithLoadingProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export function withLoading<T extends WithLoadingProps = WithLoadingProps>(
  Component: ComponentType<T>
) {
  function WithLoading(props: Omit<T, keyof WithLoadingProps>) {
    const [isLoading, setIsLoading] = useState(false);

    return (
      <Component
        {...(props as T)}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    );
  }

  WithLoading.displayName = `withLoading(${
    Component.displayName || Component.name
  })`;

  return WithLoading;
}
