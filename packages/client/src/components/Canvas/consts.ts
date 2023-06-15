import { makePathCycle } from './helpers';
import wallImg from 'assets/wall.jpg';
import pacmanSprites from 'assets/sprites/pacman-sprites.png';
import pinkySprites from 'assets/sprites/sprites-enemy1.png';
import blinkySprites from 'assets/sprites/sprites-enemy2.png';
import inkySprites from 'assets/sprites/sprites-enemy3.png';
import clydeSprites from 'assets/sprites/sprites-enemy4.png';
import pacmanImg from 'assets/pacman.png';
import smallPillImg from 'assets/pill1.png';
import bigPillImg from 'assets/pill2.png';
import { formIcons } from './helpers';
import type { EnemiesNamesType } from './Map';
import { PathType } from './Enemy';
import { SpritesData } from './helpers';

// prettier-ignore
export enum DirectionsType {up = 'up', down = 'down', left = 'left', right = 'right', still = 'still'}
// prettier-ignore
export enum CellsType {wall, empty, pacman, pinky, blinky, inky, clyde, smallPill, bigPill, PillPacman}

export type CoordinatesType = {
  x: number;
  y: number;
};

export const imagesConfig = {
  pacmanSprite: pacmanSprites,
  pinkySprite: pinkySprites,
  blinkySprite: blinkySprites,
  inkySprite: inkySprites,
  clydeSprite: clydeSprites,
  wallIcon: wallImg,
  pacmanIcon: pacmanImg,
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

export const pacmanSpritesConfig: SpritesData = {
  [DirectionsType.down]: {
    sprite: icons.pacmanSprite,
    canvasPos: { x: 0, y: 48 * 2 },
    frameSize: { x: 48, y: 48 },
    speed: 5,
    frames: [0, 1, 2, 3],
  },
  [DirectionsType.up]: {
    sprite: icons.pacmanSprite,
    canvasPos: { x: 0, y: 0 },
    frameSize: { x: 48, y: 48 },
    speed: 5,
    frames: [0, 1, 2, 3],
  },
  [DirectionsType.left]: {
    sprite: icons.pacmanSprite,
    canvasPos: { x: 0, y: 48 * 3 },
    frameSize: { x: 48, y: 48 },
    speed: 5,
    frames: [0, 1, 2, 3],
  },
  [DirectionsType.right]: {
    sprite: icons.pacmanSprite,
    canvasPos: { x: 0, y: 48 },
    frameSize: { x: 48, y: 48 },
    speed: 5,
    frames: [0, 1, 2, 3],
  },
  [DirectionsType.still]: {
    sprite: icons.pacmanSprite,
    canvasPos: { x: 0, y: 48 * 4 },
    frameSize: { x: 48, y: 48 },
    speed: 5,
    frames: [0, 1, 2, 3],
  },
};

export const pinkySpritesConfig: SpritesData = {
  [DirectionsType.down]: {
    sprite: icons.pinkySprite,
    canvasPos: { x: 0, y: 48 * 2 },
    frameSize: { x: 48, y: 48 },
    speed: 5,
    frames: [0],
  },
  [DirectionsType.up]: {
    sprite: icons.pinkySprite,
    canvasPos: { x: 0, y: 0 },
    frameSize: { x: 48, y: 48 },
    speed: 5,
    frames: [0],
  },
  [DirectionsType.left]: {
    sprite: icons.pinkySprite,
    canvasPos: { x: 0, y: 48 * 3 },
    frameSize: { x: 48, y: 48 },
    speed: 5,
    frames: [0],
  },
  [DirectionsType.right]: {
    sprite: icons.pinkySprite,
    canvasPos: { x: 0, y: 48 },
    frameSize: { x: 48, y: 48 },
    speed: 5,
    frames: [0],
  },
  [DirectionsType.still]: {
    sprite: icons.pinkySprite,
    canvasPos: { x: 0, y: 48 * 4 },
    frameSize: { x: 48, y: 48 },
    speed: 5,
    frames: [0, 1, 2, 3],
  },
};

export const blinkySpritesConfig: SpritesData = {
  [DirectionsType.down]: {
    sprite: icons.blinkySprite,
    canvasPos: { x: 0, y: 48 * 2 },
    frameSize: { x: 48, y: 48 },
    speed: 5,
    frames: [0],
  },
  [DirectionsType.up]: {
    sprite: icons.blinkySprite,
    canvasPos: { x: 0, y: 0 },
    frameSize: { x: 48, y: 48 },
    speed: 5,
    frames: [0],
  },
  [DirectionsType.left]: {
    sprite: icons.blinkySprite,
    canvasPos: { x: 0, y: 48 * 3 },
    frameSize: { x: 48, y: 48 },
    speed: 5,
    frames: [0],
  },
  [DirectionsType.right]: {
    sprite: icons.blinkySprite,
    canvasPos: { x: 0, y: 48 },
    frameSize: { x: 48, y: 48 },
    speed: 5,
    frames: [0],
  },
  [DirectionsType.still]: {
    sprite: icons.blinkySprite,
    canvasPos: { x: 0, y: 48 * 4 },
    frameSize: { x: 48, y: 48 },
    speed: 5,
    frames: [0, 1, 2, 3],
  },
};

export const inkySpritesConfig: SpritesData = {
  [DirectionsType.down]: {
    sprite: icons.inkySprite,
    canvasPos: { x: 0, y: 48 * 2 },
    frameSize: { x: 48, y: 48 },
    speed: 5,
    frames: [0],
  },
  [DirectionsType.up]: {
    sprite: icons.inkySprite,
    canvasPos: { x: 0, y: 0 },
    frameSize: { x: 48, y: 48 },
    speed: 5,
    frames: [0],
  },
  [DirectionsType.left]: {
    sprite: icons.inkySprite,
    canvasPos: { x: 0, y: 48 * 3 },
    frameSize: { x: 48, y: 48 },
    speed: 5,
    frames: [0],
  },
  [DirectionsType.right]: {
    sprite: icons.inkySprite,
    canvasPos: { x: 0, y: 48 },
    frameSize: { x: 48, y: 48 },
    speed: 5,
    frames: [0],
  },
  [DirectionsType.still]: {
    sprite: icons.inkySprite,
    canvasPos: { x: 0, y: 48 * 4 },
    frameSize: { x: 48, y: 48 },
    speed: 5,
    frames: [0, 1, 2, 3],
  },
};

export const clydeSpritesConfig: SpritesData = {
  [DirectionsType.down]: {
    sprite: icons.clydeSprite,
    canvasPos: { x: 0, y: 48 * 2 },
    frameSize: { x: 48, y: 48 },
    speed: 5,
    frames: [0],
  },
  [DirectionsType.up]: {
    sprite: icons.clydeSprite,
    canvasPos: { x: 0, y: 0 },
    frameSize: { x: 48, y: 48 },
    speed: 5,
    frames: [0],
  },
  [DirectionsType.left]: {
    sprite: icons.clydeSprite,
    canvasPos: { x: 0, y: 48 * 3 },
    frameSize: { x: 48, y: 48 },
    speed: 5,
    frames: [0],
  },
  [DirectionsType.right]: {
    sprite: icons.clydeSprite,
    canvasPos: { x: 0, y: 48 },
    frameSize: { x: 48, y: 48 },
    speed: 5,
    frames: [0],
  },
  [DirectionsType.still]: {
    sprite: icons.clydeSprite,
    canvasPos: { x: 0, y: 48 * 4 },
    frameSize: { x: 48, y: 48 },
    speed: 5,
    frames: [0, 1, 2, 3],
  },
};

export const enemiesConfig: {
  [key in EnemiesNamesType]?: {
    path: PathType;
    icon: SpritesData;
    activationTime: number;
  };
}[] = [
  {
    [CellsType.pinky]: {
      path: pinkyPath,
      icon: pinkySpritesConfig,
      activationTime: 3,
    },
  },
  {
    [CellsType.blinky]: {
      path: blinkyPath,
      icon: blinkySpritesConfig,
      activationTime: 3,
    },
  },
  {
    [CellsType.inky]: {
      path: inkyPath,
      icon: inkySpritesConfig,
      activationTime: 3,
    },
  },
  {
    [CellsType.clyde]: {
      path: clydePath,
      icon: clydeSpritesConfig,
      activationTime: 3,
    },
  },
];
