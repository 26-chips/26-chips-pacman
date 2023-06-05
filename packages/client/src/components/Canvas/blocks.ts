import { Block } from './Block';
import { icons } from './consts';

export class Wall extends Block {
  constructor(
    clearCell: () => void,
    cellSize: number,
    position: { x: number; y: number }
  ) {
    super(clearCell, cellSize, position, icons.wallIcon);
  }
}

export class Pill extends Block {
  constructor(
    clearCell: () => void,
    cellSize: number,
    position: { x: number; y: number }
  ) {
    super(clearCell, cellSize, position, icons.smallPillIcon);
  }

  checkCollisions() {
    if (super.checkCollisions()) {
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
    position: { x: number; y: number }
  ) {
    super(clearCell, cellSize, position, icons.bigPillIcon);
  }

  checkCollisions() {
    if (super.checkCollisions()) {
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
    position: { x: number; y: number }
  ) {
    super(clearCell, cellSize, position, null);
  }
}
