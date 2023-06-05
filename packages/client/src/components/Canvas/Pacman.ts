/* eslint-disable no-fallthrough */
import { DirectionsType, CellsType } from './Canvas';
import { Character } from './Character';
import { icons } from './consts';
export class Pacman extends Character {
  private isStill: boolean;

  private fieldPosition: { x: number; y: number };

  private isBlocked: {
    up: boolean;
    down: boolean;
    left: boolean;
    right: boolean;
    still: boolean;
  };

  constructor(
    field: CellsType[][],
    startPosition: { x: number; y: number },
    cellSize: number,
    private direction: DirectionsType = 'still'
  ) {
    super(icons.pacmanIcon, field, startPosition, cellSize);

    this.direction = direction;
    this.currentDirection = direction;
    this.isStill = true;
    this.fieldPosition = { x: 0, y: 0 };
    this.isBlocked = {
      up: true,
      down: false,
      left: false,
      right: false,
      still: false,
    };
  }

  updateDirection(newDirection: DirectionsType) {
    this.direction = newDirection;
    this.isStill = false;

    if (
      newDirection === 'still' ||
      (this.currentDirection === 'down' && newDirection === 'up') ||
      (this.currentDirection === 'up' && newDirection === 'down') ||
      (this.currentDirection === 'left' && newDirection === 'right') ||
      (this.currentDirection === 'right' && newDirection === 'left')
    ) {
      this.currentDirection = newDirection;
    }
  }

  updatePosition() {
    if (this.isBlocked[this.currentDirection]) {
      this.isStill = true;
    } else {
      super.updatePosition(this.currentDirection);
    }

    //срабатывает когда пакман приходитв центр клетки
    if (this.fieldX % 1 === 0 && this.fieldY % 1 === 0) {
      this.fieldPosition.x = this.fieldX;
      this.fieldPosition.y = this.fieldY;

      this.isBlocked.up =
        this.field?.[this.fieldPosition.y - 1]?.[this.fieldPosition.x] ===
        'wall';
      this.isBlocked.down =
        this.field?.[this.fieldPosition.y + 1]?.[this.fieldPosition.x] ===
        'wall';
      this.isBlocked.right =
        this.field?.[this.fieldPosition.y][this.fieldPosition.x + 1] === 'wall';
      this.isBlocked.left =
        this.field?.[this.fieldPosition.y][this.fieldPosition.x - 1] === 'wall';

      if (!this.isBlocked[this.direction]) {
        this.currentDirection = this.direction;
      }
    } else {
      this.isBlocked.up = false;
      this.isBlocked.down = false;
      this.isBlocked.right = false;
      this.isBlocked.left = false;
    }
  }

  reset() {
    super.reset();
    this.updateDirection('still');
  }

  getIfStill() {
    return this.isStill;
  }
}
