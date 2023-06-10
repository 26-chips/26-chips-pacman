import { ROUTES } from 'router';
import { CanvasComponent } from 'components/Canvas/Canvas';
import styles from './gameBlock.module.scss';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { EndGameScreen } from 'components';
import cn from 'classnames';

const START_COUNT = 3;

export function GameBlock(): JSX.Element {
  const navigate = useNavigate();

  const [points, setPoints] = useState(0);
  const [lives, setLives] = useState<number>(3);
  const [time, setTime] = useState<number>(0);
  const [count, setCount] = useState(START_COUNT);
  const [isPaused, setIsPaused] = useState(true);
  const [maximumPoints, setMaximumPoints] = useState(0);

  const reduceLives = useCallback(() => {
    setLives(prev => prev - 1);
  }, []);

  const isCountDown = useMemo(() => {
    return count > 0;
  }, [count]);

  const allPillsCollected = useMemo(() => {
    return points === maximumPoints;
  }, [points, maximumPoints]);

  const gameIsOver = useMemo(() => {
    return lives <= 0 || allPillsCollected;
  }, [lives, maximumPoints, points]);

  const handleModalClose = () => {
    navigate(ROUTES.MAIN);
  };

  const resetCounter = () => {
    setCount(START_COUNT);
  };

  // количество очков = собранные таблетки * на оставшиеся жизни + 5*(60 - потрченное время)
  const totalScore = useMemo(() => {
    return (points * lives + 5 * (60 - time)).toString();
  }, [points, lives, time]);

  useEffect(() => {
    console.log(lives, allPillsCollected);
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

  return (
    <>
      <div>
        <div>
          {maximumPoints},{points}
        </div>
        <p className={styles.text}>{`Current points ${points}`}</p>
        <p className={styles.text}>{`Current lives ${lives}`}</p>
        <p className={styles.text}>{`Time ${time}`}</p>
      </div>
      <div
        className={cn(styles['canvas-container'], isPaused && styles.paused)}>
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
        username="Vlad"
        show={gameIsOver}
        onClose={handleModalClose}
        score={totalScore}
        elapsedTimeSec={time}
      />

      {isCountDown && (
        <div className={styles.overlay}>
          <div className={cn(styles.countdown, styles['overlay-content'])}>
            {count}
          </div>
        </div>
      )}
      {isPaused && !isCountDown && (
        <div className={styles.overlay}>
          <div className={cn(styles.pause, styles['overlay-content'])}>
            PAUSED
          </div>
        </div>
      )}
    </>
  );
}
