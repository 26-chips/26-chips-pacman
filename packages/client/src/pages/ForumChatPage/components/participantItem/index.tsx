import styles from './participantItem.module.scss';
import defaultAvatar from 'assets/default-avatar.png';

interface ParticipantItemProps {
  name: string;
  avatar?: string;
}

export const ParticipantItem = (props: ParticipantItemProps) => {
  const { name, avatar = defaultAvatar } = props;
  return (
    <li className={styles.participant}>
      <span>{name}</span>
      <div className={styles.avatar}>
        <img className={styles.image} src={avatar} alt="Аватар" />
      </div>
    </li>
  );
};
