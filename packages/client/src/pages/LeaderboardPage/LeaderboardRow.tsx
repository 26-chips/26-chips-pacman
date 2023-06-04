import defaultAvatar from 'assets/icons/default_avatar.svg';
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
        <img src={avatar || defaultAvatar} alt="default avatar" />
      </td>
      <td>{name}</td>
      <td>{score}</td>
    </tr>
  );
}
