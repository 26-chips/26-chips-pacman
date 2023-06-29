import defaultAvatar from 'assets/icons/default_avatar.svg';
import styles from './leaderboard.module.scss';
import { LeaderboardInfo } from './types';
import { Avatar } from '../../components';

interface LeaderboardRowProps extends Partial<LeaderboardInfo> {
  place: number;
}

export function LeaderboardRow({
  points,
  userAvatar,
  userNickname,
  place,
  time,
}: LeaderboardRowProps): JSX.Element {
  return (
    <li className={styles.leaderboardRow}>
      <p>{place}</p>
      <Avatar
        image={userAvatar ? userAvatar : defaultAvatar}
        className={styles.avatar}
      />
      <p>{userNickname}</p>
      <p>{points}</p>
      <p>{time}</p>
    </li>
  );
}
