import { useRef, useEffect, useState, useCallback } from 'react';
import { CellsClassInstances, Map } from './Map';
import { mapString } from './lvl1';
import { Pill, BigPill } from './blocks';
import { smallPillPoints, bigPillPoints, imagesConfig } from './consts';
import { DirectionsType } from './consts';
import { loadImage } from './resources';
import { Pacman } from './Pacman';
import { Enemy } from './Enemy';

type Props = {
  setTime: (value: number) => void;
  reduceLives: () => void;
  resetCounter: () => void;
  isPaused: boolean;
  isCountDown: boolean;
  setMaximumPoints: (value: number) => void;
  allPillsCollected: boolean;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
};

const ticksPerSecond = 50;

export function CanvasComponent({
  setPoints,
  reduceLives,
  setTime,
  isPaused,
  isCountDown,
  setIsPaused,
  resetCounter,
  setMaximumPoints,
  allPillsCollected,
}: Props) {
  const [canvasSize, setCanvasSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestIdRef = useRef<number | null>(null);
  const totalGameTimeRef = useRef<number>(0);
  const ticksCounter = useRef<number>(0);
  const timeoutRef = useRef<number | null>();
  const mapRef = useRef<Map>(new Map(mapString));
  const mapAsBlocksRef = useRef<CellsClassInstances[][]>(
    mapRef.current.getMapAsBlocks()
  );
  const pacmanRef = useRef<Pacman>(mapRef.current.getPacman());
  const enemiesRef = useRef<Enemy[]>(mapRef.current.getEnemies());

  const handleDeath = () => {
    reduceLives();
    pacmanRef.current.reset();
    enemiesRef.current.forEach(item => item.reset());
    setIsPaused(true);
    resetCounter();
  };

  const handleKeyboard = useCallback(
    (e: KeyboardEvent) => {
      switch (e.code) {
        case 'ArrowUp':
          console.log('UPp');
          pacmanRef.current.updateDirection(DirectionsType.up);
          break;
        case 'ArrowRight':
          console.log(pacmanRef.current);
          pacmanRef.current.updateDirection(DirectionsType.right);
          break;
        case 'ArrowDown':
          pacmanRef.current.updateDirection(DirectionsType.down);
          break;
        case 'ArrowLeft':
          pacmanRef.current.updateDirection(DirectionsType.left);
          break;
        case 'Space':
          if (!isCountDown) {
            setIsPaused(current => !current);
          }
          break;
      }
    },
    [isCountDown]
  );

  const updateFieldAfterPacman = () => {
    pacmanRef.current.updatePosition();
    enemiesRef.current.forEach(item => {
      item.updatePosition();
    });
  };

  const renderFrame = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');

    if (!ctx) return;

    const { x, y } = pacmanRef.current.getPosition();

    for (const row of mapAsBlocksRef.current) {
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

    enemiesRef.current.forEach(item => {
      if (item.getCollisionWithPacman(x, y)) {
        handleDeath();
      }
    });

    pacmanRef.current.paint(ctx);
    enemiesRef.current.forEach(item => {
      item.paint(ctx);
    });
    updateFieldAfterPacman();
  };

  const tick = (pause: boolean) => {
    if (!pause) {
      renderFrame();
    }

    if (!canvasRef.current) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      if (!pause) {
        // дергаем пропсы только раз в секунду
        if (ticksCounter.current === ticksPerSecond) {
          setTime((totalGameTimeRef.current += 1));

          enemiesRef.current.forEach(item => {
            item.updateTime();
          });

          ticksCounter.current = 0;
        } else {
          ticksCounter.current++;
        }
      }

      requestIdRef.current = requestAnimationFrame(() => tick(pause));
    }, 1000 / ticksPerSecond);
  };

  useEffect(() => {
    setCanvasSize(mapRef.current.getCanvasSize());
    setMaximumPoints(mapRef.current.getTotalPoints());
  }, []);

  useEffect(() => {
    if (canvasSize) {
      Promise.all(
        Object.values(imagesConfig).map(item => {
          return loadImage(item);
        })
      ).then(() => {
        renderFrame();
      });

      return () => {
        cancelAnimationFrame(requestIdRef.current!);
      };
    }
  }, [canvasSize]);

  useEffect(() => {
    cancelAnimationFrame(requestIdRef.current!);
    requestIdRef.current = requestAnimationFrame(() => tick(isPaused));
  }, [isPaused]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboard);
    return () => {
      document.removeEventListener('keydown', handleKeyboard);
    };
  }, [isCountDown]);

  useEffect(() => {
    document.removeEventListener('keydown', handleKeyboard);
  }, [allPillsCollected]);

  return <canvas {...canvasSize} ref={canvasRef} />;
}
