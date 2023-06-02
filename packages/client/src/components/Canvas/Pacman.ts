import { DirectionsType, CellsType } from './Canvas';
import { cellSize } from './Canvas';

export class Pacman {
  private isStill: boolean;

  private step: number;

  private centerPosition: { x: number; y: number };

  private fieldPosition: { x: number; y: number };

  private currentDirection: DirectionsType;

  private position: { x: number; y: number };

  private isBlocked: {
    up: boolean;
    down: boolean;
    left: boolean;
    right: boolean;
    still: boolean;
  };

  constructor(
    private field: CellsType[][],
    //позиция в координатах-пикселях
    private startPosition: { x: number; y: number },
    // позиция в матрице поля
    private direction: DirectionsType = 'still'
  ) {
    this.startPosition = startPosition;
    this.step = 5;
    this.position = { ...this.startPosition };
    this.direction = direction;
    this.currentDirection = direction;
    this.field = field;
    this.isStill = true;
    this.centerPosition = { x: 0, y: 0 };
    this.fieldPosition = { x: 0, y: 0 };
    this.isBlocked = {
      up: true,
      down: false,
      left: true,
      right: true,
      still: true,
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
    switch (this.currentDirection) {
      case 'up':
        if (!this.isBlocked.up) {
          if (this.position.y > this.step) {
            this.position.y -= this.step;
          } else {
            this.position.y = this.field.length * cellSize - cellSize / 2;
          }
        } else {
          this.isStill = true;
        }
        break;

      case 'down':
        if (!this.isBlocked.down) {
          if (
            this.position.y <
            this.field.length * cellSize - cellSize / 2 - this.step
          ) {
            this.position.y += this.step;
          } else {
            this.position.y = 0;
          }
        } else {
          this.isStill = true;
        }
        break;

      case 'right':
        if (!this.isBlocked.right) {
          if (
            this.position.x <
            this.field[0].length * cellSize - cellSize / 2 - this.step
          ) {
            this.position.x += this.step;
          } else {
            this.position.x = 0;
          }
        } else {
          this.isStill = true;
        }
        break;

      case 'left':
        if (!this.isBlocked.left) {
          if (this.position.x > this.step) {
            this.position.x -= this.step;
          } else {
            this.position.x = this.field[0].length * cellSize - cellSize / 2;
          }
        } else {
          this.isStill = true;
        }
        break;
    }

    this.centerPosition = {
      x: this.position.x + cellSize / 2,
      y: this.position.y + cellSize / 2,
    };

    const fieldX = (this.centerPosition.x - cellSize / 2) / cellSize;
    const fieldY = (this.centerPosition.y - cellSize / 2) / cellSize;

    //срабатывает когда пакман приходитв центр клетки
    if (fieldX % 1 === 0 && fieldY % 1 === 0) {
      this.fieldPosition.x = fieldX;
      this.fieldPosition.y = fieldY;

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
    this.position = { ...this.startPosition };
    this.updateDirection('still');
  }

  getPosition() {
    return this.position;
  }

  getIfStill() {
    return this.isStill;
  }
}
