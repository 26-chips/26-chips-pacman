import type { FunctionComponent } from 'react';

import { LeaderboardField } from './LeaderboardField';
import { LeaderboardRow } from './LeaderboardRow';
import styles from './leaderboard.module.scss';
import { useEffect, useState } from 'react';
import { useGetLeaderboardMutation } from 'api';
import { GetLeaderboardType, LeaderboardData } from './types';

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

function LeaderboardPage(): JSX.Element {
  const [getLeaderboard] = useGetLeaderboardMutation();
  const [leaderbordList, setLeaderboardList] = useState<LeaderboardData[]>([]);

  useEffect(() => {
    const submitData: GetLeaderboardType = {
      ratingFieldName: 'points',
      cursor: 0,
      limit: 10,
    };

    const getLeaderboardList = async (data: GetLeaderboardType) => {
      try {
        const list = await getLeaderboard(data).unwrap();
        setLeaderboardList(list);
      } catch (err) {
        throw new Error((err as Error).message);
      }
    };

    getLeaderboardList(submitData);
  }, []);

  return (
    <section className={styles.leaderboard}>
      <ul className={styles.leaderboardTitles}>
        {leaderboardFields.map(field => (
          <LeaderboardField key={field.id} {...field} />
        ))}
      </ul>
      <ul className={styles.list}>
        {leaderbordList.map(
          (
            { data: { userId, points, userAvatar, userNickname, time } },
            index
          ) => (
            <LeaderboardRow
              key={userId}
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

export default LeaderboardPage as FunctionComponent;
