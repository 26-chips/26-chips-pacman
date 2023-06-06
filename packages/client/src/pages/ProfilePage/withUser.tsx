import { useState, useEffect } from 'react';
import type { ComponentType, Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router';
import { fetchUser } from 'api';
import { ROUTES } from 'router';

export interface IUser {
  avatar: string;
  display_name: string;
  email: string;
  first_name: string;
  login: string;
  phone: string;
  second_name: string;
}

export interface WithUserProps {
  user: IUser;
  setUser: Dispatch<SetStateAction<boolean>>;
}

export function withUser<T extends WithUserProps>(Component: ComponentType<T>) {
  function WithUser(props: Omit<T, keyof WithUserProps>) {
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
      const fetch = async () => {
        try {
          const { data } = await fetchUser();
          setUser(data);
        } catch (e) {
          console.log(e);
          navigate(ROUTES.SIGNIN);
        }
      };

      fetch();
    }, []);

    return user ? (
      <Component {...(props as T)} user={user} setUser={setUser} />
    ) : null;
  }

  WithUser.displayName = `withUser(${Component.displayName || Component.name})`;

  return WithUser;
}
