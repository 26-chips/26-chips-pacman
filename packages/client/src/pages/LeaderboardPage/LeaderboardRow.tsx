import defaultAvatar from 'assets/icons/default_avatar.svg';
import styles from './leaderboard.module.scss';
import type { LeaderboardData } from './types';

interface LeaderboardRowProps extends LeaderboardData {
  place: number;
}

export function LeaderboardRow({
  place,
  name,
  score,
  avatar,
}: LeaderboardRowProps): JSX.Element {
  return (
    <tr>
      <td>{place}</td>
      <td>
        <img
          src={avatar || defaultAvatar}
          alt="default avatar"
          className={styles.avatar}
        />
      </td>
      <td>{name}</td>
      <td>{score}</td>
    </tr>
  );
}
