import loader from 'assets/loader.svg';
import styles from './loader.module.scss';

export const Loader = () => {
  return (
    <div className={styles.loader}>
      <img src={loader} alt="Загрузка" />
    </div>
  );
};
