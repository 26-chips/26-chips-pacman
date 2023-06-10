import { CanvasComponent } from 'components/Canvas/Canvas';
import styles from './gameBlock.module.scss';
import { useState } from 'react';

export function GameBlock(): JSX.Element {
  const [points, setPoints] = useState(0);
  const [lives, setLives] = useState<number>(3);
  const [time, setTime] = useState<number>(0);

  const reduceLives = () => {
    setLives(prev => prev - 1);
  };

  return (
    <>
      <div>
        <p className={styles.text}>{`Current points ${points}`}</p>
        <p className={styles.text}>{`Current lives ${lives}`}</p>
        <p className={styles.text}>{`Time ${time}`}</p>
      </div>
      <div className={styles['canvas-container']}>
        {
          <CanvasComponent
            setPoints={setPoints}
            reduceLives={reduceLives}
            setTime={setTime}
          />
        }
      </div>
    </>
  );
}
