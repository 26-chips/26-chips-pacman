import { CellsType, CoordinatesType } from './consts';
import { DirectionsType } from './consts';
import { Character } from './Character';
import { isCollidesSquare } from './helpers';
import { pacmanSize, enemiesSize } from './consts';
import { Sprite } from './Sprite';

export type PathType = {
  direction: DirectionsType;
  steps: number;
}[];

export class Enemy extends Character {
  // текущий кусок пути
  private currentPathChunk: number;

  // шаг в текущем куске пути
  private stepInCurrentChunk: number;

  //текущее направлене
  currentDirection: DirectionsType;

  //прошло секунд с начала игры
  private time: number;

  constructor(
    field: CellsType[][],
    startPosition: CoordinatesType,
    cellSize: number,
    sprite: Sprite,
    private path: PathType,
    private activationTime: number
  ) {
    super(field, startPosition, cellSize, sprite);

    this.currentPathChunk = 0;
    this.currentDirection = this.path[0].direction;
    this.stepInCurrentChunk = 0;
    this.time = 0;
  }

  updateTime(time?: number) {
    this.time = typeof time !== 'undefined' ? time : this.time + 1;
  }

  updatePosition() {
    if (this.isStopped) {
      return;
    }
    if (this.time >= this.activationTime) {
      super.updatePosition(this.currentDirection);

      if (this.fieldX % 1 === 0 && this.fieldY % 1 === 0) {
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

  paint(ctx: CanvasRenderingContext2D) {
    super.paint(ctx, this.currentDirection);
  }

  getCollisionWithPacman(x: number, y: number) {
    if (this.isStopped) {
      return false;
    }

    return isCollidesSquare(
      x,
      y,
      pacmanSize - 1,
      this.position.x,
      this.position.y,
      enemiesSize - 1
    );
  }

  reset() {
    super.reset();
    this.currentDirection = this.path[0].direction;
    this.currentPathChunk = 0;
    this.stepInCurrentChunk = 0;
    this.updateTime(0);
  }
}
