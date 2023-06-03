import { CellsType } from './Canvas';
import { makePathCycle } from './helpers';
import wallImg from 'assets/wall.jpg';
import pinkyImg from 'assets/pinky.png';
import pacmanImg from 'assets/pacman.png';
import smallPillImg from 'assets/pill1.png';
import bigPillImg from 'assets/pill2.png';
import { formIcons } from './helpers';

export const imagesConfig = {
  wallIcon: wallImg,
  pacmanIcon: pacmanImg,
  pinkyIcon: pinkyImg,
  smallPillIcon: smallPillImg,
  bigPillIcon: bigPillImg,
};

export const icons = formIcons(imagesConfig);

export const field = <CellsType[][]>[
  [
    'wall',
    'wall',
    'wall',
    'empty',
    'wall',
    'wall',
    'wall',
    'wall',
    'wall',
    'empty',
    'wall',
    'wall',
    'wall',
  ],
  [
    'wall',
    'bigPill',
    'wall',
    'smallPill',
    'smallPill',
    'smallPill',
    'wall',
    'smallPill',
    'smallPill',
    'smallPill',
    'wall',
    'bigPill',
    'wall',
  ], //2
  [
    'wall',
    'smallPill',
    'wall',
    'smallPill',
    'smallPill',
    'smallPill',
    'wall',
    'smallPill',
    'smallPill',
    'smallPill',
    'wall',
    'smallPill',
    'wall',
  ], //3
  [
    'empty',
    'smallPill',
    'wall',
    'wall',
    'smallPill',
    'wall',
    'wall',
    'wall',
    'smallPill',
    'wall',
    'wall',
    'smallPill',
    'empty',
  ], //4
  [
    'wall',
    'smallPill',
    'smallPill',
    'smallPill',
    'smallPill',
    'smallPill',
    'empty',
    'smallPill',
    'smallPill',
    'smallPill',
    'smallPill',
    'smallPill',
    'wall',
  ], //5
  [
    'wall',
    'wall',
    'wall',
    'smallPill',
    'smallPill',
    'empty',
    'empty',
    'empty',
    'smallPill',
    'smallPill',
    'wall',
    'wall',
    'wall',
  ], //6
  [
    'empty',
    'smallPill',
    'wall',
    'wall',
    'wall',
    'wall',
    'smallPill',
    'wall',
    'wall',
    'wall',
    'wall',
    'smallPill',
    'empty',
  ], //7
  [
    'wall',
    'smallPill',
    'smallPill',
    'smallPill',
    'empty',
    'wall',
    'smallPill',
    'wall',
    'empty',
    'smallPill',
    'smallPill',
    'smallPill',
    'wall',
  ], //8
  [
    'wall',
    'smallPill',
    'wall',
    'wall',
    'smallPill',
    'wall',
    'wall',
    'wall',
    'smallPill',
    'wall',
    'wall',
    'smallPill',
    'wall',
  ], //9
  [
    'wall',
    'smallPill',
    'smallPill',
    'smallPill',
    'smallPill',
    'wall',
    'smallPill',
    'wall',
    'smallPill',
    'smallPill',
    'smallPill',
    'smallPill',
    'wall',
  ], //10
  [
    'wall',
    'wall',
    'smallPill',
    'wall',
    'smallPill',
    'wall',
    'smallPill',
    'wall',
    'smallPill',
    'wall',
    'smallPill',
    'wall',
    'wall',
  ], //11
  [
    'empty',
    'smallPill',
    'smallPill',
    'wall',
    'smallPill',
    'empty',
    'empty',
    'empty',
    'smallPill',
    'wall',
    'smallPill',
    'smallPill',
    'empty',
  ], //12
  [
    'wall',
    'wall',
    'wall',
    'wall',
    'smallPill',
    'wall',
    'wall',
    'wall',
    'smallPill',
    'wall',
    'wall',
    'wall',
    'wall',
  ], //13
  [
    'wall',
    'smallPill',
    'wall',
    'smallPill',
    'smallPill',
    'smallPill',
    'smallPill',
    'smallPill',
    'smallPill',
    'smallPill',
    'wall',
    'smallPill',
    'wall',
  ], //14
  [
    'wall',
    'smallPill',
    'wall',
    'wall',
    'wall',
    'wall',
    'smallPill',
    'wall',
    'wall',
    'wall',
    'wall',
    'smallPill',
    'wall',
  ], //15
  [
    'wall',
    'bigPill',
    'smallPill',
    'smallPill',
    'smallPill',
    'smallPill',
    'smallPill',
    'smallPill',
    'smallPill',
    'smallPill',
    'smallPill',
    'bigPill',
    'wall',
  ], //16
  [
    'wall',
    'wall',
    'wall',
    'empty',
    'wall',
    'wall',
    'wall',
    'wall',
    'wall',
    'empty',
    'wall',
    'wall',
    'wall',
  ], //17
];

export const pinkyPath = makePathCycle([
  { direction: 'up', steps: 3 },
  { direction: 'right', steps: 5 },
  { direction: 'up', steps: 3 },
  { direction: 'down', steps: 3 },
  { direction: 'left', steps: 10 },
  { direction: 'right', steps: 7 },
  { direction: 'up', steps: 2 },
  { direction: 'left', steps: 1 },
]);
