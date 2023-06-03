import { PathType } from './Enemy';

export const requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

export const collidesSquare = (
  x1: number,
  y1: number,
  size1: number,
  x2: number,
  y2: number,
  size2: number
) => {
  const halfSize1 = size1 / 2;
  const halfSize2 = size2 / 2;

  const centerX1 = x1 + halfSize1;
  const centerY1 = y1 + halfSize1;
  const centerX2 = x2 + halfSize2;
  const centerY2 = y2 + halfSize2;

  const distanceX = Math.abs(centerX1 - centerX2);
  const distanceY = Math.abs(centerY1 - centerY2);

  if (distanceX > halfSize1 + halfSize2 || distanceY > halfSize1 + halfSize2) {
    return false;
  }

  return true;
};

export const makePathCycle = (arr: PathType) => {
  const cycleArray = arr;

  [...arr].reverse().forEach(item => {
    const direction = () => {
      switch (item.direction) {
        case 'down':
          return 'up';
        case 'up':
          return 'down';
        case 'left':
          return 'right';
        default:
          return 'left';
      }
    };
    cycleArray.push({ direction: direction(), steps: item.steps });
  });

  return cycleArray;
};

export const formIcons = <T extends Record<string, string>>(
  config: T
): Record<keyof T, HTMLImageElement> => {
  // prettier-ignore
  const icon: Record<keyof T, HTMLImageElement> = {} as Record<keyof T, HTMLImageElement>;

  for (const key in config) {
    const img = new Image();
    img.src = config[key];
    icon[key] = img;
  }
  return icon;
};
