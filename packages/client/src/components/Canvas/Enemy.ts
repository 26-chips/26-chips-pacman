import { DirectionsType, CellsType } from './Canvas';
import { cellSize } from './Canvas';

export type PathType = {
  direction: DirectionsType;
  steps: number;
}[];

export class Enemy {
  private centerPosition: { x: number; y: number };

  // шаг в пикселях за цикл
  private step: number;

  // текущий кусок пути
  private currentPathChunk: number;

  // шаг в текущем куске пути
  private stepInCurrentChunk: number;

  //текущее направлене
  private currentDirection: DirectionsType;

  //прошло секунд с начала игры
  private time: number;

  private position: { x: number; y: number };

  constructor(
    private path: PathType,
    private field: CellsType[][],
    private startPosition: { x: number; y: number },
    private activationTime: number
  ) {
    this.step = 5;
    this.startPosition = startPosition;
    this.position = { ...this.startPosition };
    this.centerPosition = { x: 0, y: 0 };
    this.currentPathChunk = 0;
    this.currentDirection = this.path[0].direction;
    this.stepInCurrentChunk = 0;
    this.time = 0;
  }

  updateTime(time?: number) {
    this.time = typeof time != 'undefined' ? time : this.time + 1;
  }

  updatePosition() {
    if (this.time >= this.activationTime) {
      if (this.currentDirection === 'up') {
        if (this.position.y > this.step) {
          this.position.y -= this.step;
        } else {
          this.position.y = this.field.length * cellSize - cellSize / 2;
        }
      }

      if (this.currentDirection === 'down') {
        if (
          this.position.y <
          this.field.length * cellSize - cellSize / 2 - this.step
        ) {
          this.position.y += this.step;
        } else {
          this.position.y = 0;
        }
      }

      if (this.currentDirection === 'right') {
        if (
          this.position.x <
          this.field[0].length * cellSize - cellSize / 2 - this.step
        ) {
          this.position.x += this.step;
        } else {
          this.position.x = 0;
        }
      }

      if (this.currentDirection === 'left') {
        if (this.position.x > this.step) {
          this.position.x -= this.step;
        } else {
          this.position.x = this.field[0].length * cellSize - cellSize / 2;
        }
      }

      this.centerPosition = {
        x: this.position.x + cellSize / 2,
        y: this.position.y + cellSize / 2,
      };

      const fieldX = (this.centerPosition.x - cellSize / 2) / 50;
      const fieldY = (this.centerPosition.y - cellSize / 2) / 50;

      if (fieldX % 1 === 0 && fieldY % 1 === 0) {
        if (
          this.path[this.currentPathChunk].steps - 1 ===
          this.stepInCurrentChunk
        ) {
          if (this.path.length - 1 == this.currentPathChunk) {
            this.currentDirection = this.path[0].direction;
            this.currentPathChunk = 0;
            this.stepInCurrentChunk = 0;
          } else {
            this.currentDirection =
              this.path[this.currentPathChunk + 1].direction;
            this.currentPathChunk++;
            this.stepInCurrentChunk = 0;
          }
        } else {
          this.stepInCurrentChunk++;
        }
      }
    }
  }

  reset() {
    this.position = { ...this.startPosition };
    this.currentDirection = this.path[0].direction;
    this.currentPathChunk = 0;
    this.stepInCurrentChunk = 0;
    this.updateTime(0);
  }

  getPosition() {
    return this.position;
  }
}
