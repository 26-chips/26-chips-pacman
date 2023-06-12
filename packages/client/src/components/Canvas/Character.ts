import { CellsType, CoordinatesType } from './consts';
import { DirectionsType } from './consts';
import { Sprite } from './Sprite';

export type PathType = {
  direction: DirectionsType;
  steps: number;
}[];

export abstract class Character {
  public centerPosition: CoordinatesType;

  // шаг в пикселях за цикл
  public step: number;

  public fieldX: number;

  public fieldY: number;

  public currentDirection: DirectionsType;

  public position: CoordinatesType;

  public initialSprite: Sprite;

  public isStopped: boolean;

  constructor(
    public field: CellsType[][],
    public startPosition: CoordinatesType,
    public cellSize: number,
    public sprite: Sprite
  ) {
    this.cellSize = cellSize;
    this.step = 5;
    this.position = {
      x: startPosition.x * cellSize,
      y: startPosition.y * cellSize,
    };
    this.centerPosition = { x: 0, y: 0 };
    this.fieldX = 0;
    this.fieldY = 0;
    this.currentDirection = DirectionsType.still;
    this.initialSprite = sprite;
    this.isStopped = false;
  }

  updatePosition(direction: DirectionsType) {
    if (this.isStopped) {
      return;
    }
    switch (direction) {
      case DirectionsType.up:
        this.position.y =
          this.position.y > this.step
            ? this.position.y - this.step
            : this.field.length * this.cellSize - this.cellSize / 2;
        break;

      case DirectionsType.down:
        this.position.y =
          this.position.y <
          this.field.length * this.cellSize - this.cellSize / 2 - this.step
            ? this.position.y + this.step
            : 0;
        break;

      case DirectionsType.right:
        this.position.x =
          this.position.x <
          this.field[0].length * this.cellSize - this.cellSize / 2 - this.step
            ? this.position.x + this.step
            : 0;
        break;

      case DirectionsType.left:
        this.position.x =
          this.position.x > this.step
            ? this.position.x - this.step
            : this.field[0].length * this.cellSize - this.cellSize / 2;
        break;
    }

    this.sprite.updatePos({ x: this.position.x, y: this.position.y });

    this.centerPosition = {
      x: this.position.x + this.cellSize / 2,
      y: this.position.y + this.cellSize / 2,
    };

    this.fieldX = (this.centerPosition.x - this.cellSize / 2) / this.cellSize;
    this.fieldY = (this.centerPosition.y - this.cellSize / 2) / this.cellSize;
  }

  stop() {
    this.isStopped = true;
  }

  getPosition() {
    return this.position;
  }

  updateSprite() {
    this.sprite.update();
  }

  setNewSprite(newSprite: Sprite) {
    this.sprite = newSprite;
  }

  reset() {
    this.setNewSprite(this.initialSprite);
    this.updateSprite();
    this.isStopped = false;
    this.position = {
      x: this.startPosition.x * this.cellSize,
      y: this.startPosition.y * this.cellSize,
    };
    this.sprite.updatePos({ x: this.position.x, y: this.position.y });
  }

  paint(ctx: CanvasRenderingContext2D, direction: DirectionsType) {
    const angles = {
      [DirectionsType.right]: 0,
      [DirectionsType.down]: 90,
      [DirectionsType.left]: 180,
      [DirectionsType.up]: 270,
      [DirectionsType.still]: 0,
    };

    this.sprite.render(ctx, angles[direction]);
  }
}
