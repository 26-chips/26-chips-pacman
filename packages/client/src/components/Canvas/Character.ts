import { DirectionsType, CellsType } from './Canvas';

export type PathType = {
  direction: DirectionsType;
  steps: number;
}[];

export abstract class Character {
  public centerPosition: { x: number; y: number };

  // шаг в пикселях за цикл
  public step: number;

  public fieldX: number;

  public fieldY: number;

  public currentDirection: DirectionsType;

  public position: { x: number; y: number };

  constructor(
    public image: HTMLImageElement,
    public field: CellsType[][],
    public startPosition: { x: number; y: number },
    public cellSize: number
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
    this.currentDirection = 'still';
  }

  updatePosition(direction: DirectionsType) {
    switch (direction) {
      case 'up':
        this.position.y =
          this.position.y > this.step
            ? this.position.y - this.step
            : this.field.length * this.cellSize - this.cellSize / 2;
        break;

      case 'down':
        this.position.y =
          this.position.y <
          this.field.length * this.cellSize - this.cellSize / 2 - this.step
            ? this.position.y + this.step
            : 0;
        break;

      case 'right':
        this.position.x =
          this.position.x <
          this.field[0].length * this.cellSize - this.cellSize / 2 - this.step
            ? this.position.x + this.step
            : 0;
        break;

      case 'left':
        this.position.x =
          this.position.x > this.step
            ? this.position.x - this.step
            : this.field[0].length * this.cellSize - this.cellSize / 2;
        break;
    }

    this.centerPosition = {
      x: this.position.x + this.cellSize / 2,
      y: this.position.y + this.cellSize / 2,
    };

    this.fieldX = (this.centerPosition.x - this.cellSize / 2) / this.cellSize;
    this.fieldY = (this.centerPosition.y - this.cellSize / 2) / this.cellSize;
  }

  getPosition() {
    return this.position;
  }

  reset() {
    this.position = {
      x: this.startPosition.x * this.cellSize,
      y: this.startPosition.y * this.cellSize,
    };
  }

  paint(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.cellSize,
      this.cellSize
    );
  }
}
