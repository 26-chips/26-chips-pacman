import { ROUTES } from 'router';
import { CanvasComponent } from 'components/Canvas/Canvas';
import styles from './gameBlock.module.scss';
import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { EndGameScreen } from 'components';
import cn from 'classnames';
import { FullscreenButton } from './FullscreenButton';
import { useFetchUserQuery, useAddUserToLeaderboardMutation } from 'api';
import { formUserName } from 'utils/helpers';
import { SoundButton } from './SoundButton';
import { AudioElements, pauseAll, toggleMute } from './SoundConfig';
import { GameResultForLeaderboard } from '../types';

const START_COUNT = 3;
const LIVES = 3;

export function GameBlock(): JSX.Element {
  const { data: user } = useFetchUserQuery();
  const navigate = useNavigate();

  const [points, setPoints] = useState(0);
  const [lives, setLives] = useState<number>(LIVES);
  const [time, setTime] = useState<number>(0);
  const [count, setCount] = useState(START_COUNT);
  const [isPaused, setIsPaused] = useState(true);
  const [maximumPoints, setMaximumPoints] = useState(0);

  const location = useLocation();

  // pause all sounds when exit /game
  useEffect(() => {
    pauseAll();
  }, [location]);

  useEffect(() => {
    if (isPaused) {
      AudioElements.gameLoop.pause();
    } else {
      AudioElements.gameLoop.play();
    }
  }, [isPaused]);

  const [addUserToLeaderboard] = useAddUserToLeaderboardMutation();

  const reduceLives = () => {
    setLives(prev => prev - 1);
  };

  const isCountDown = useMemo(() => {
    return count > 0;
  }, [count]);

  const allPillsCollected = useMemo(() => {
    return points > 0 && points === maximumPoints;
  }, [points, maximumPoints]);

  const gameIsOver = useMemo(() => {
    return lives <= 0 || allPillsCollected;
  }, [lives, maximumPoints, points]);

  const resetCounter = () => {
    setCount(START_COUNT);
  };

  // количество очков = собранные таблетки * на оставшиеся жизни + 5*(60 - потрченное время)
  const totalScore = useMemo(() => {
    const timeBonus = 5 * (60 - time) > 0 ? 5 * (60 - time) : 0;
    return points * (lives + 1) + timeBonus;
  }, [points, lives, time]);

  useEffect(() => {
    if (lives && !allPillsCollected) {
      const timer = count > 0 && setInterval(() => setCount(count - 1), 1000);
      return () => {
        if (timer) {
          clearInterval(timer);
        }
      };
    }
  }, [count, allPillsCollected]);

  useEffect(() => {
    if (count <= 0) {
      setIsPaused(false);
    }
  }, [count]);

  useEffect(() => {
    if (allPillsCollected) {
      setIsPaused(true);
    }
  }, [allPillsCollected]);

  // TODO найти способ получше задать черный фон
  useEffect(() => {
    document.body.classList.add('blackBG');
    return () => document.body.classList.remove('blackBG');
  });

  useEffect(() => {
    const submitData: GameResultForLeaderboard = {
      data: {
        points: totalScore,
        time: time,
        userId: user?.id,
        userNickname: formUserName(user, 'Guest'),
        userAvatar: user?.avatar,
      },
      ratingFieldName: 'points',
      teamName: 'chips',
    };

    const addResultToLeaderboard = async () => {
      try {
        await addUserToLeaderboard(submitData).unwrap();
      } catch (err) {
        throw new Error((err as Error).message);
      }
    };

    if (gameIsOver) {
      addResultToLeaderboard();
    }
  }, [gameIsOver]);

  const handleModalClose = () => {
    navigate(ROUTES.MAIN);
  };

  return (
    <>
      <div className={styles.gameControl}>
        <p className={styles.gameInfo}>
          Очки:
          <span className={styles.gameInfoCount}>{points}</span>
        </p>
        <p className={styles.gameInfo}>
          Оставшиеся жизни:
          <span className={styles.gameInfoCount}>{lives}</span>
        </p>
        <p className={styles.gameInfo}>
          Время:
          <span className={styles.gameInfoCount}>{time}</span>
        </p>
      </div>
      <div className={styles.iconContainer}>
        <FullscreenButton />
        <SoundButton toggleMute={toggleMute} />
      </div>
      <div className={cn(styles.canvasContainer, isPaused && styles.paused)}>
        {
          <CanvasComponent
            setPoints={setPoints}
            reduceLives={reduceLives}
            setTime={setTime}
            isPaused={isPaused}
            setIsPaused={setIsPaused}
            isCountDown={isCountDown}
            resetCounter={resetCounter}
            setMaximumPoints={setMaximumPoints}
            allPillsCollected={allPillsCollected}
          />
        }
      </div>

      <EndGameScreen
        className={styles.endGame}
        username={formUserName(user, 'Guest')}
        show={gameIsOver}
        onClose={handleModalClose}
        score={totalScore}
        elapsedTimeSec={time}
      />

      {isCountDown && (
        <div className={styles.overlay}>
          <div className={cn(styles.countdown, styles.overlayContent)}>
            {count}
          </div>
        </div>
      )}
      {isPaused && !isCountDown && (
        <div className={styles.overlay}>
          <div className={cn(styles.pause, styles.overlayContent)}>PAUSED</div>
        </div>
      )}
    </>
  );
}
