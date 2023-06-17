import { Block } from './Block';
import { CoordinatesType, icons } from './consts';
import { smallPillSize, bigPillSize } from './consts';

export class Wall extends Block {
  constructor(
    clearCell: () => void,
    cellSize: number,
    position: CoordinatesType
  ) {
    super(clearCell, cellSize, position, icons.wallIcon);
  }
}

export class Pill extends Block {
  constructor(
    clearCell: () => void,
    cellSize: number,
    position: CoordinatesType
  ) {
    super(clearCell, cellSize, position, icons.smallPillIcon, smallPillSize);
  }

  checkCollisions(x: number, y: number) {
    if (super.checkCollisions(x, y)) {
      this.clearCell();
      return true;
    }
    return false;
  }
}

export class BigPill extends Block {
  constructor(
    clearCell: () => void,
    cellSize: number,
    position: CoordinatesType
  ) {
    super(clearCell, cellSize, position, icons.bigPillIcon, bigPillSize);
  }

  checkCollisions(x: number, y: number) {
    if (super.checkCollisions(x, y)) {
      this.clearCell();
      return true;
    }
    return false;
  }
}

export class Empty extends Block {
  constructor(
    clearCell: () => void,
    cellSize: number,
    position: CoordinatesType
  ) {
    super(clearCell, cellSize, position, null);
  }
}
