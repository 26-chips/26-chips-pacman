import { LeaderboardField } from './LeaderboardField';
import { LeaderboardRow } from './LeaderboardRow';
import styles from './leaderboard.module.scss';
import { useGetLeaderboardQuery } from 'api';
import { LeaderboardData, GetLeaderboardType } from './types';

export const leaderboardFields = [
  {
    id: 'place',
    title: 'Рейтинг',
  },
  {
    id: 'avatar',
    title: '',
  },
  {
    id: 'username',
    title: 'Никнейм',
  },
  {
    id: 'score',
    title: 'Очки',
  },
  {
    id: 'time',
    title: 'Время, c.',
  },
];

export const leaderboardConfig: GetLeaderboardType = {
  ratingFieldName: 'points',
  cursor: 0,
  limit: 10,
};

export function LeaderboardPage(): JSX.Element {
  const { data: leaderbordList }: { data?: LeaderboardData[] } =
    useGetLeaderboardQuery(leaderboardConfig);

  return (
    <section className={styles.leaderboard}>
      <ul className={styles.leaderboardTitles}>
        {leaderboardFields.map(field => (
          <LeaderboardField key={field.id} {...field} />
        ))}
      </ul>
      <ul className={styles.list}>
        {leaderbordList?.map(
          (
            { data: { userId, points, userAvatar, userNickname, time } },
            index
          ) => (
            <LeaderboardRow
              key={`${userId}_${index}`}
              points={points}
              userAvatar={userAvatar}
              userNickname={userNickname}
              time={time}
              place={index + 1}
            />
          )
        )}
      </ul>
    </section>
  );
}
