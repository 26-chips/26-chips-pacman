export class Sprite {
  private _index: number;

  private canvasPos: [number, number];

  public done: boolean;

  constructor(
    private image: CanvasImageSource,
    private pos: [number, number],
    //private canvasPos: [number, number],
    private size: [number, number],
    private speed: number,
    private frames: number[],
    private dir?: 'horizontal' | 'vertical',
    private once?: boolean
  ) {
    this.pos = pos;
    this.size = size;
    this.speed = typeof speed === 'number' ? speed : 1;
    this.frames = frames;
    this._index = 0;
    this.image = image;
    this.dir = dir || 'horizontal';
    this.once = once || false;
    this.done = false;
    this.canvasPos = [0, 0];
  }

  public update(): void {
    //console.log('update', dt);
    this._index += 0.125;
  }

  public updatePos(value: [number, number]) {
    this.canvasPos = value;
  }

  public render(ctx: CanvasRenderingContext2D): void {
    let frame;

    if (this.speed > 0) {
      //console.log('this._index', this._index);
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

    let x = this.pos[0];
    let y = this.pos[1];

    //console.log(this.dir, this.size, frame);
    if (this.dir == 'vertical') {
      y += frame * this.size[1];
    } else {
      x += frame * this.size[0];
    }

    console.log(x, y);
    ctx.drawImage(
      this.image,
      x,
      y,
      this.size[0],
      this.size[1],
      this.canvasPos[0],
      this.canvasPos[1],
      this.size[0],
      this.size[1]
    );
  }
}
