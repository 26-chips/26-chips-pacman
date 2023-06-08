import { makePathCycle } from './helpers';
import wallImg from 'assets/wall.jpg';
import pinkyImg from 'assets/pinky.png';
import pacmanImg from 'assets/pacman.png';
import smallPillImg from 'assets/pill1.png';
import bigPillImg from 'assets/pill2.png';
import { formIcons } from './helpers';
import type { EnemiesNamesType } from './Map';
import { PathType } from './Enemy';
// prettier-ignore
export enum DirectionsType {up = 'up', down = 'down', left = 'left', right = 'right', still = 'still'}
// prettier-ignore
export enum CellsType {wall, empty, pacman, pinky, blinky, inky, clyde, smallPill, bigPill, PillPacman}

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
  { direction: DirectionsType.up, steps: 3 },
  { direction: DirectionsType.right, steps: 5 },
  { direction: DirectionsType.up, steps: 2 },
  { direction: DirectionsType.down, steps: 2 },
  { direction: DirectionsType.left, steps: 10 },
  { direction: DirectionsType.right, steps: 7 },
  { direction: DirectionsType.up, steps: 2 },
  { direction: DirectionsType.left, steps: 1 },
]);

export const enemiesConfig: {
  [key in EnemiesNamesType]?: {
    path: PathType;
    icon: HTMLImageElement;
    activationTime: number;
  };
}[] = [
  {
    [CellsType.pinky]: {
      path: pinkyPath,
      icon: icons.pinkyIcon,
      activationTime: 2,
    },
  },
];
