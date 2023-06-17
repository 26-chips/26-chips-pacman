import { pacmanSize } from './consts';
import { isCollidesSquare } from './helpers';
import { CoordinatesType } from './consts';

export abstract class Block {
  public pacmanPosition: CoordinatesType;

  constructor(
    public clearCell: () => void,
    public cellSize: number,
    public position: CoordinatesType,
    public image: HTMLImageElement | null,
    public elementSize?: number
  ) {
    this.image = image;
    this.cellSize = cellSize;
    this.position = position;
    this.clearCell = clearCell;
    this.pacmanPosition = { x: 0, y: 0 };
    this.elementSize = elementSize;
  }

  setPacmanPosition(x: number, y: number) {
    this.pacmanPosition = { x, y };
  }

  checkCollisions(x: number, y: number) {
    return isCollidesSquare(
      this.position.x * this.cellSize + this.cellSize / 2,
      this.position.y * this.cellSize + this.cellSize / 2,
      this.elementSize || this.cellSize,
      x,
      y,
      pacmanSize
    );
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.image) {
      ctx.drawImage(
        this.image,
        this.position.x * this.cellSize,
        this.position.y * this.cellSize,
        this.cellSize,
        this.cellSize
      );
    } else {
      ctx.fillStyle = 'black';
      ctx.fillRect(
        this.position.x * this.cellSize,
        this.position.y * this.cellSize,
        this.cellSize,
        this.cellSize
      );
    }
  }
}
