import { CoordinatesType } from './consts';

export class Sprite {
  private _index: number;

  public done: boolean;

  constructor(
    private image: CanvasImageSource,
    private canvasPos: CoordinatesType,
    private pos: CoordinatesType,
    private size: CoordinatesType,
    private speed: number,
    private frames: number[],
    private once?: boolean
  ) {
    this.pos = pos;
    this.size = size;
    this.speed = speed || 1;
    this.frames = frames;
    this._index = 0;
    this.image = image;
    this.once = once || false;
    this.done = false;
    this.canvasPos = canvasPos;
  }

  public update(): void {
    this._index += 1 / this.speed;
  }

  public updatePos(value: CoordinatesType) {
    this.canvasPos = value;
  }

  public render(ctx: CanvasRenderingContext2D, angle: number): void {
    let frame;

    if (this.speed > 0) {
      const max = this.frames.length; //2
      const idx = Math.floor(this._index);
      frame = this.frames[idx % max];

      if (this.once && idx >= max) {
        this.done = true;
        return;
      }
    } else {
      frame = 0;
    }

    let x = this.pos.x;
    const y = this.pos.y;

    x += frame * this.size.x;

    switch (angle) {
      case 90:
        ctx.translate(
          this.canvasPos.x + this.size.x / 2,
          this.canvasPos.y + this.size.y / 2
        );
        ctx.rotate(Math.PI / 2);
        ctx.drawImage(
          this.image,
          x,
          y,
          this.size.x,
          this.size.y,
          -this.size.y / 2,
          -this.size.x / 2,
          this.size.y,
          this.size.x
        );
        ctx.rotate(-Math.PI / 2);
        ctx.translate(
          -(this.canvasPos.x + this.size.x / 2),
          -(this.canvasPos.y + this.size.y / 2)
        );
        break;
      case 180:
        ctx.translate(
          this.canvasPos.x + this.size.x / 2,
          this.canvasPos.y + this.size.y / 2
        );
        ctx.rotate(Math.PI);
        ctx.drawImage(
          this.image,
          x,
          y,
          this.size.x,
          this.size.y,
          -this.size.x / 2,
          -this.size.y / 2,
          this.size.x,
          this.size.y
        );
        ctx.rotate(-Math.PI);
        ctx.translate(
          -(this.canvasPos.x + this.size.x / 2),
          -(this.canvasPos.y + this.size.y / 2)
        );
        break;
      case 270:
        ctx.translate(
          this.canvasPos.x + this.size.x / 2,
          this.canvasPos.y + this.size.y / 2
        );
        ctx.rotate(-Math.PI / 2);
        ctx.drawImage(
          this.image,
          x,
          y,
          this.size.x,
          this.size.y,
          -this.size.y / 2,
          -this.size.x / 2,
          this.size.y,
          this.size.x
        );
        ctx.rotate(Math.PI / 2);
        ctx.translate(
          -(this.canvasPos.x + this.size.x / 2),
          -(this.canvasPos.y + this.size.y / 2)
        );
        break;
      default:
        ctx.drawImage(
          this.image,
          x,
          y,
          this.size.x,
          this.size.y,
          this.canvasPos.x,
          this.canvasPos.y,
          this.size.x,
          this.size.y
        );
        break;
    }
  }
}
