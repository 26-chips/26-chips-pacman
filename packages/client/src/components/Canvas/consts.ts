import { makePathCycle } from './helpers';
import wallImg from 'assets/wall.jpg';
import spriteImg from 'assets/sprites.png';
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

export type CoordinatesType = {
  x: number;
  y: number;
};

export const imagesConfig = {
  sprite: spriteImg,
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
export const pacmanSize = 30;
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

export const blinkyPath = makePathCycle([
  { direction: DirectionsType.down, steps: 1 },
  { direction: DirectionsType.up, steps: 3 },
]);

export const inkyPath = makePathCycle([
  { direction: DirectionsType.down, steps: 3 },
]);

export const clydePath = makePathCycle([
  { direction: DirectionsType.down, steps: 2 },
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
      icon: icons.sprite,
      activationTime: 3,
    },
  },
  {
    [CellsType.blinky]: {
      path: blinkyPath,
      icon: icons.sprite,
      activationTime: 3,
    },
  },
  {
    [CellsType.inky]: {
      path: inkyPath,
      icon: icons.sprite,
      activationTime: 3,
    },
  },
  {
    [CellsType.clyde]: {
      path: clydePath,
      icon: icons.sprite,
      activationTime: 3,
    },
  },
];
