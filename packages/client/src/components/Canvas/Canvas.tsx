import { useRef, useEffect, useState, useCallback } from 'react';
import { CellsClassInstances, Map } from './Map';
import { mapString } from './lvl1';
import { Pill, BigPill } from './blocks';
import { smallPillPoints, bigPillPoints, imagesConfig, icons } from './consts';
import { DirectionsType } from './consts';
import { loadImage } from './resources';
import { Pacman } from './Pacman';
import { Enemy } from './Enemy';
import { Sprite } from './Sprite';

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

  const deathIsProcessing = useRef(false);
  const timeoutsArrayRef = useRef<number[]>([]);
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

  const handleKeyboard = useCallback(
    (e: KeyboardEvent) => {
      switch (e.code) {
        case 'ArrowUp':
          pacmanRef.current.updateDirection(DirectionsType.up);
          break;
        case 'ArrowRight':
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

  const handleDeath = () => {
    document.removeEventListener('keydown', handleKeyboard);
    deathIsProcessing.current = true;
    const { x, y } = pacmanRef.current.getPosition();

    const sprite = new Sprite(
      icons.pacmanSprite,
      {
        x: x,
        y: y,
      },
      { x: 0, y: 48 * 5 },
      { x: 48, y: 48 },
      5,
      [0, 1, 2, 3, 4, 5, 6]
    );
    pacmanRef.current.setNewSprite(sprite);
    pacmanRef.current.stop();
    enemiesRef.current.forEach(item => item.stop());

    setTimeout(() => {
      document.addEventListener('keydown', handleKeyboard);
      deathIsProcessing.current = false;
      reduceLives();
      pacmanRef.current.reset();
      enemiesRef.current.forEach(item => item.reset());
      setIsPaused(true);
      resetCounter();
    }, 2000);
  };

  const updateFieldAfterPacman = () => {
    enemiesRef.current.forEach(item => {
      item.updatePosition();
      item.updateSprite();
    });
    pacmanRef.current.updatePosition();
    pacmanRef.current.updateSprite();
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

    enemiesRef.current.forEach(item => {
      item.paint(ctx);
    });
    pacmanRef.current.paint(ctx);
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
      if (!pause && !deathIsProcessing.current) {
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

    timeoutsArrayRef.current.push(timeoutRef.current);
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
    for (let i = 0; i < timeoutsArrayRef.current.length; i++) {
      clearTimeout(timeoutsArrayRef.current[i]);
    }
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
