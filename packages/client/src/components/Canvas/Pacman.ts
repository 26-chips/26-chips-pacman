/* eslint-disable no-fallthrough */
import { CellsType, CoordinatesType } from './consts';
import { DirectionsType } from './consts';
import { Character } from './Character';
import { Sprite } from './Sprite';
export class Pacman extends Character {
  private isStill: boolean;

  private fieldPosition: CoordinatesType;

  private isBlocked: {
    up: boolean;
    down: boolean;
    left: boolean;
    right: boolean;
    still: boolean;
  };

  constructor(
    field: CellsType[][],
    startPosition: CoordinatesType,
    cellSize: number,
    sprite: Sprite,
    private direction: DirectionsType = DirectionsType.still
  ) {
    super(field, startPosition, cellSize, sprite);
    this.direction = direction;
    this.currentDirection = direction;
    this.isStill = true;
    this.fieldPosition = { x: 0, y: 0 };
    this.isBlocked = {
      [DirectionsType.up]: true,
      [DirectionsType.down]: false,
      [DirectionsType.left]: false,
      [DirectionsType.right]: false,
      [DirectionsType.still]: false,
    };
  }

  updateDirection(newDirection: DirectionsType) {
    this.direction = newDirection;
    this.isStill = false;

    if (
      newDirection === DirectionsType.still ||
      (this.currentDirection === DirectionsType.down &&
        newDirection === DirectionsType.up) ||
      (this.currentDirection === DirectionsType.up &&
        newDirection === DirectionsType.down) ||
      (this.currentDirection === DirectionsType.left &&
        newDirection === DirectionsType.right) ||
      (this.currentDirection === DirectionsType.right &&
        newDirection === DirectionsType.left)
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

      this.isBlocked[DirectionsType.up] =
        this.field?.[this.fieldPosition.y - 1]?.[this.fieldPosition.x] ===
        CellsType.wall;
      this.isBlocked[DirectionsType.down] =
        this.field?.[this.fieldPosition.y + 1]?.[this.fieldPosition.x] ===
        CellsType.wall;
      this.isBlocked[DirectionsType.right] =
        this.field?.[this.fieldPosition.y][this.fieldPosition.x + 1] ===
        CellsType.wall;
      this.isBlocked[DirectionsType.left] =
        this.field?.[this.fieldPosition.y][this.fieldPosition.x - 1] ===
        CellsType.wall;

      if (!this.isBlocked[this.direction]) {
        this.currentDirection = this.direction;
      }
    } else {
      this.isBlocked[DirectionsType.up] = false;
      this.isBlocked[DirectionsType.down] = false;
      this.isBlocked[DirectionsType.right] = false;
      this.isBlocked[DirectionsType.left] = false;
    }
  }

  paint(ctx: CanvasRenderingContext2D) {
    super.paint(ctx, this.currentDirection);
  }

  reset() {
    super.reset();
    this.updateDirection(DirectionsType.still);
  }

  getIsStill() {
    return this.isStill;
  }
}
