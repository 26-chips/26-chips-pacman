import { makePathCycle } from './helpers';
import wallImg from 'assets/wall.jpg';
import pinkyImg from 'assets/pinky.png';
import pacmanImg from 'assets/pacman.png';
import smallPillImg from 'assets/pill1.png';
import bigPillImg from 'assets/pill2.png';
import { formIcons } from './helpers';
import type { EnemiesNamesType } from './Map';
import { PathType } from './Enemy';

export const imagesConfig = {
  wallIcon: wallImg,
  pacmanIcon: pacmanImg,
  pinkyIcon: pinkyImg,
  smallPillIcon: smallPillImg,
  bigPillIcon: bigPillImg,
};

export const icons = formIcons(imagesConfig);
export const bigPillSize = 20;
export const smallPillSize = 10;
export const enemiesSize = 10;
export const pacmanSize = 50;
export const smallPillPoints = 4;
export const bigPillPoints = 8;

export const pinkyPath = makePathCycle([
  { direction: 'up', steps: 3 },
  { direction: 'right', steps: 5 },
  { direction: 'up', steps: 2 },
  { direction: 'down', steps: 2 },
  { direction: 'left', steps: 10 },
  { direction: 'right', steps: 7 },
  { direction: 'up', steps: 2 },
  { direction: 'left', steps: 1 },
]);

export const enemiesConfig: {
  [key in EnemiesNamesType]?: {
    path: PathType;
    icon: HTMLImageElement;
    activationTime: number;
  };
}[] = [
  {
    pinky: {
      path: pinkyPath,
      icon: icons.pinkyIcon,
      activationTime: 2,
    },
  },
];
