import { useRef, useEffect, useState } from 'react';
import { Map } from './Map';
import { mapString } from './lvl1';
import { Pill, BigPill } from './blocks';
import { smallPillPoints, bigPillPoints, imagesConfig } from './consts';

export type DirectionsType = 'up' | 'down' | 'left' | 'right' | 'still';
export type CellsType =
  | 'wall'
  | 'empty'
  | 'pacman'
  | 'pinky'
  | 'blinky'
  | 'inky'
  | 'clyde'
  | 'smallPill'
  | 'bigPill'
  | 'pill+pacman';

type Props = {
  setTime: (value: number) => void;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
  reduceLives: () => void;
};

const ticksPerSecond = 50;

export function CanvasComponent({ setPoints, reduceLives, setTime }: Props) {
  const [canvasSize, setCanvasSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestIdRef = useRef<number | null>(null);
  const refGameIsPaused = useRef<boolean>(true);
  const totalGameTimeRef = useRef<number>(0);
  const ticksCounter = useRef<number>(0);

  const map = new Map(mapString);
  const mapAsBlocks = map.getMapAsBlocks();
  const pacman = map.getPacman();
  const enemies = map.getEnemies();

  const handleDeath = () => {
    reduceLives();
    refGameIsPaused.current = true;
    pacman.reset();
    enemies.forEach(item => item.reset());
  };

  const handleKeyboard = (e: KeyboardEvent) => {
    switch (e.code) {
      case 'ArrowUp':
        pacman.updateDirection('up');
        break;
      case 'ArrowRight':
        pacman.updateDirection('right');
        break;
      case 'ArrowDown':
        pacman.updateDirection('down');
        break;
      case 'ArrowLeft':
        pacman.updateDirection('left');
        break;
      case 'Space':
        refGameIsPaused.current = !refGameIsPaused.current;
        break;
    }
  };

  const updateFieldAfterPacman = () => {
    pacman.updatePosition();
    enemies.forEach(item => {
      item.updatePosition();
    });
  };

  const renderFrame = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');

    if (!ctx) return;

    const { x, y } = pacman.getPosition();

    for (const row of mapAsBlocks) {
      for (const block of row) {
        if (block) {
          block.draw(ctx);

          // TODO возможно заменить на dispatch евента внутри класса
          if (block.checkCollisions(x, y)) {
            if (block instanceof Pill) {
              setPoints((prev: number) => prev + smallPillPoints);
            }
            if (block instanceof BigPill) {
              setPoints((prev: number) => prev + bigPillPoints);
            }
          }
        }
      }
    }

    enemies.forEach(item => {
      if (item.getCollisionWithPacman(x, y)) {
        handleDeath();
      }
    });

    pacman.paint(ctx);
    enemies.forEach(item => {
      item.paint(ctx);
    });
    updateFieldAfterPacman();
  };

  const tick = () => {
    if (!refGameIsPaused.current) {
      renderFrame();
    }

    if (!canvasRef.current) return;

    setTimeout(() => {
      if (!refGameIsPaused.current) {
        // дергаем пропсы только раз в секунду
        if (ticksCounter.current === ticksPerSecond) {
          setTime((totalGameTimeRef.current += 1));

          enemies.forEach(item => {
            item.updateTime();
          });

          ticksCounter.current = 0;
        } else {
          ticksCounter.current++;
        }
      }

      requestIdRef.current = requestAnimationFrame(tick);
    }, 1000 / ticksPerSecond);
  };

  useEffect(() => {
    setCanvasSize(map.getCanvasSize());
  }, []);

  useEffect(() => {
    if (canvasSize) {
      document.addEventListener('keydown', handleKeyboard);

      Promise.all(Object.values(imagesConfig)).then(() => {
        renderFrame();
      });

      requestIdRef.current = requestAnimationFrame(tick);

      return () => {
        cancelAnimationFrame(requestIdRef.current!);
        document.removeEventListener('keydown', handleKeyboard);
      };
    }
  }, [canvasSize]);

  return <canvas {...canvasSize} ref={canvasRef} />;
}
