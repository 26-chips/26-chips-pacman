import styles from './developer.module.scss';
import { DeveloperType } from '../../types';

export const Developer = (props: DeveloperType) => {
  const { avatar, name, githubName, githubLink } = props;
  return (
    <div className={styles.developer}>
      <img src={avatar} alt="Avatar" />
      <p className={styles.name}>{name}</p>
      <p className={styles.github}>github</p>
      <a href={githubLink} target="_blank" className={styles.githubLink}>{githubName}</a>
    </div>
  );
};
