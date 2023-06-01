import { useRef, useEffect, useCallback } from 'react';
import { Enemy } from './Enemy';
import { pinkyPath } from './consts';
import { collidesSquare } from './helpers';
import { Pacman } from './Pacman';
import wallImg from '../../assets/wall.jpg';
import pinkyImg from '../../assets/pinky.png';
import pacmanImg from '../../assets/pacman.png';
import smallPillImg from '../../assets/pill1.png';
import bigPillImg from '../../assets/pill2.png';
import { resourcesHandler } from './resources';
import { field as fieldArray } from './consts';

export type DirectionsType = 'up' | 'down' | 'left' | 'right' | 'still';
export type CellsType =
  | 'wall'
  | 'empty'
  | 'pacman'
  | 'smallPill'
  | 'bigPill'
  | 'pill+pacman';

type Props = {
  setTime: (value: number) => void;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
  reduceLives: () => void;
};

//должно делиться на 2 без остатка
export const cellSize = 50;
const bigPillSize = 20;
const smallPillSize = 10;
const enemiesSize = 10;
const pacmanSize = 10;
const smallPillPoints = 4;
const bigPillPoints = 8;
const ticksPerSecond = 50;
const size = { width: 650, height: 850 };
const pacmanStartPosition = { x: 6, y: 4 };
const pinkyStartPosition = { x: 6, y: 7 };

export function CanvasComponent({ setPoints, reduceLives, setTime }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestIdRef = useRef<number | null>(null);
  const field = useRef<CellsType[][]>(fieldArray);
  const refGameIsPaused = useRef<boolean>(true);
  const totalGameTimeRef = useRef<number>(0);
  const ticksCounter = useRef<number>(0);

  const wallIcon = new Image();
  const pinkyIcon = new Image();
  const pacmanIcon = new Image();
  const smallPillIcon = new Image();
  const bigPillIcon = new Image();

  wallIcon.src = wallImg;
  pacmanIcon.src = pacmanImg;
  pinkyIcon.src = pinkyImg;
  smallPillIcon.src = smallPillImg;
  bigPillIcon.src = bigPillImg;

  const pacman = new Pacman(field.current, {
    x: pacmanStartPosition.x * cellSize,
    y: pacmanStartPosition.y * cellSize,
  });
  const pinky = new Enemy(
    pinkyPath,
    field.current,
    { x: pinkyStartPosition.x * cellSize, y: pinkyStartPosition.y * cellSize },
    5
  );

  const handleDeath = () => {
    reduceLives();
    refGameIsPaused.current = true;
    pacman.reset();
    pinky.reset();
  };

  const handleKeyboard = (e: KeyboardEvent) => {
    if (e.code === 'ArrowUp') {
      pacman.updateDirection('up');
    }
    if (e.code === 'ArrowRight') {
      pacman.updateDirection('right');
    }
    if (e.code === 'ArrowDown') {
      pacman.updateDirection('down');
    }
    if (e.code === 'ArrowLeft') {
      pacman.updateDirection('left');
    }
    if (e.code === 'Space') {
      refGameIsPaused.current = !refGameIsPaused.current;
    }
  };

  const updateFieldAfterPacman = () => {
    pacman.updatePosition();
    pinky.updatePosition();
  };

  const renderFrame = useCallback(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');

      if (ctx) {
        const fld = field.current;
        let { x, y } = pacman.getPosition();
        let { x: enemyX, y: enemyY } = pinky.getPosition();

        for (let i = 0; i < fld.length; i++) {
          for (let j = 0; j < fld[i].length; j++) {
            if (fld[i][j] === 'smallPill') {
              //если пересекаемся с маленькой таблеткой то кушаем ее
              if (
                collidesSquare(
                  j * cellSize + cellSize / 2,
                  i * cellSize + cellSize / 2,
                  smallPillSize,
                  x,
                  y,
                  cellSize
                )
              ) {
                setPoints((prev: number) => prev + smallPillPoints);
                fld[i][j] = 'empty';
                //если нет - то отрисовываем
              } else {
                ctx.drawImage(
                  smallPillIcon,
                  j * cellSize,
                  i * cellSize,
                  cellSize,
                  cellSize
                );
              }
            } else if (fld[i][j] === 'bigPill') {
              //если пересекаемся с большой таблеткой то кушаем ее
              if (
                collidesSquare(
                  j * cellSize + cellSize / 2,
                  i * cellSize + cellSize / 2,
                  bigPillSize,
                  x,
                  y,
                  cellSize
                )
              ) {
                setPoints((prev: number) => prev + bigPillPoints);
                fld[i][j] = 'empty';
                //если нет - то отрисовываем
              } else {
                ctx.drawImage(
                  bigPillIcon,
                  j * cellSize,
                  i * cellSize,
                  cellSize,
                  cellSize
                );
              }
            } else {
              if (fld[i][j] !== 'wall') {
                ctx.fillStyle = 'black';
                ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
              }
            }
          }
        }

        // если пересеклись с противником - смерть
        if (
          collidesSquare(x, y, pacmanSize - 1, enemyX, enemyY, enemiesSize - 1)
        ) {
          handleDeath();

          x = pacman.getPosition().x;
          y = pacman.getPosition().y;
          enemyX = pinky.getPosition().x;
          enemyY = pinky.getPosition().y;
        }
        ctx.drawImage(pinkyIcon, enemyX, enemyY, cellSize, cellSize);
        ctx.drawImage(pacmanIcon, x, y, cellSize, cellSize);
      }

      updateFieldAfterPacman();
    }
  }, []);

  const renderWalls = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      const fld = field.current;

      for (let i = 0; i < fld.length; i++) {
        for (let j = 0; j < fld[i].length; j++) {
          if (fld[i][j] === 'wall') {
            if (ctx) {
              ctx.drawImage(
                wallIcon,
                j * cellSize,
                i * cellSize,
                cellSize,
                cellSize
              );
            }
          }
        }
      }
    }
  };

  const tick = useCallback(() => {
    if (!refGameIsPaused.current) {
      renderFrame();
    }

    if (!canvasRef.current) return;

    setTimeout(() => {
      if (!refGameIsPaused.current) {
        // дергаем пропсы только раз в секунду
        if (ticksCounter.current === ticksPerSecond) {
          setTime((totalGameTimeRef.current += 1));
          pinky.updateTime();
          ticksCounter.current = 0;
        } else {
          ticksCounter.current++;
        }
      }

      requestIdRef.current = requestAnimationFrame(tick);
    }, 1000 / ticksPerSecond);
  }, []);

  useEffect(() => {
    resourcesHandler.load([
      wallImg,
      pacmanImg,
      pinkyImg,
      smallPillImg,
      bigPillImg,
    ]);
    document.addEventListener('keydown', handleKeyboard);

    //стены рисуем вне цикла
    resourcesHandler.onReady(() => {
      renderWalls();
      renderFrame();
    });

    requestIdRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(requestIdRef.current!);
      document.removeEventListener('keydown', handleKeyboard);
    };
  }, []);

  return (
    <>
      <canvas {...size} ref={canvasRef} />
    </>
  );
}
