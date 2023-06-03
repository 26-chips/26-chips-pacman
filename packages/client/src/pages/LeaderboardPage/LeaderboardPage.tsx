import type { FunctionComponent } from 'react';

import { leaderboardFields } from './data';
import { LeaderboardField } from './LeaderboardField';
import { LeaderboardRow } from './LeaderboardRow';
import styles from './leaderboard.module.scss';
import { LeaderboardData } from './types';

const MOCK_DATA: LeaderboardData[] = [
  {
    avatar: null,
    name: 'ivanivi',
    score: 16789988,
  },
  {
    avatar: null,
    name: 'petrovi',
    score: 15000,
  },
  {
    avatar: null,
    name: 'mishapetrov',
    score: 14899,
  },
];

function LeaderboardPage(): JSX.Element {
  return (
    <section className={styles.wrapper}>
      <table className={styles.leaderboard}>
        <thead>
          <tr>
            {leaderboardFields.map(field => (
              <LeaderboardField key={field.id} {...field} />
            ))}
          </tr>
        </thead>
        <tbody>
          {MOCK_DATA.map((data, index) => (
            <LeaderboardRow key={index} {...data} place={index + 1} />
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default LeaderboardPage as FunctionComponent;
