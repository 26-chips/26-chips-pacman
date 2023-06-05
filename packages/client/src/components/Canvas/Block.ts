import { pacmanSize, smallPillSize } from './consts';
import { collidesSquare } from './helpers';

export abstract class Block {
  public pacmanPosition: { x: number; y: number };

  constructor(
    public clearCell: () => void,
    public cellSize: number,
    public position: { x: number; y: number },
    public image: HTMLImageElement | null
  ) {
    this.image = image;
    this.cellSize = cellSize;
    this.position = position;
    this.clearCell = clearCell;
    this.pacmanPosition = { x: 0, y: 0 };
  }

  setPacmanPosition(x: number, y: number) {
    this.pacmanPosition = { x, y };
  }

  checkCollisions() {
    return collidesSquare(
      this.position.x * this.cellSize + this.cellSize / 2,
      this.position.y * this.cellSize + this.cellSize / 2,
      smallPillSize,
      this.pacmanPosition.x,
      this.pacmanPosition.y,
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
