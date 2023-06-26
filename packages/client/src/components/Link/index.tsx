import { Link as RouterLink, LinkProps } from 'react-router-dom';
import styles from './styles.module.scss';

export const Link = ({ children, to }: LinkProps) => (
  <RouterLink to={to} className={styles.link}>
    {children}
  </RouterLink>
);
