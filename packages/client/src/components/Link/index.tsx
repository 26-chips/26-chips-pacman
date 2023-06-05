import { NavLink, NavLinkProps } from 'react-router-dom';
import styles from './styles.module.scss';

interface LinkProps extends NavLinkProps {
  to: string;
}

export const Link = (props: LinkProps) => {
  const { children, to } = props;
  return (
    <NavLink to={to} className={styles.link}>
      {children}
    </NavLink>
  );
};
