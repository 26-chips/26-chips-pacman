//import { mapString } from './lvl1';
import { Wall, Pill, Empty, BigPill } from './blocks';
import { CellsType } from './Canvas';
import { Pacman } from './Pacman';
import { Enemy } from './Enemy';
import { enemiesConfig } from './consts';

export type StringMapSymbols =
  | '#'
  | '.'
  | ' '
  | '*'
  | 'G'
  | 'P'
  | 'B'
  | 'I'
  | 'C';
export type CellsClassType =
  | typeof Wall
  | typeof Pill
  | typeof Empty
  | typeof BigPill;
export type CellsClassInstances = Wall | Pill | Empty | BigPill;
//TODO разрешить разногласия prettier и eslint
// prettier-ignore
export type EnemiesNamesType = Extract<CellsType, 'pinky' | 'blinky' | 'inky' | 'clyde'>;

const symbolsToString: Record<StringMapSymbols, CellsClassType> = {
  '#': Wall,
  '.': Pill,
  ' ': Empty,
  '*': BigPill,
  G: Empty,
  P: Empty,
  B: Empty,
  I: Empty,
  C: Empty,
};

const symbolsToInstances: Record<StringMapSymbols, CellsType> = {
  '#': 'wall',
  '.': 'smallPill',
  ' ': 'empty',
  '*': 'bigPill',
  G: 'pacman',
  P: 'pinky',
  B: 'blinky',
  I: 'inky',
  C: 'clyde',
};

const enemiesNames: EnemiesNamesType[] = ['pinky', 'blinky', 'inky', 'clyde'];

export class Map {
  private cellSize: number;

  private xSize: number;

  private ySize: number;

  private mapAsStrings: CellsType[][];

  private mapAsBlocks: CellsClassInstances[][];

  constructor(private mapUrl: string) {
    this.cellSize = 50;
    this.mapAsStrings = this.fillMapAsStrings(this.mapUrl);
    this.xSize = this.mapAsStrings.length * this.cellSize;
    this.ySize = this.mapAsStrings[0].length * this.cellSize;
    this.mapAsBlocks = this.fillMapAsBlocks(this.mapUrl);
  }

  fillMapAsBlocks(str: string) {
    const result: CellsClassInstances[][] = [];
    const arr = str.split('\n');

    arr.forEach((row, i) => {
      result.push(
        row.split('').map((item, j) => {
          const clearCell = () => {
            this.mapAsBlocks[i][j] = new Empty(() => {}, this.cellSize, {
              x: j,
              y: i,
            });
          };

          const instance = symbolsToString[item as StringMapSymbols] || Empty;
          return new instance(clearCell, this.cellSize, { x: j, y: i });
        })
      );
    });

    return result;
  }

  fillMapAsStrings(str: string) {
    const result: CellsType[][] = [];

    const arr = str.split('\n');
    arr.forEach(row => {
      result.push(
        row.split('').map(item => {
          return symbolsToInstances[item as StringMapSymbols];
        })
      );
    });

    return result;
  }

  getMapAsBlocks() {
    return this.mapAsBlocks;
  }

  getMapAsStrings() {
    return this.mapAsStrings;
  }

  getCanvasSize() {
    return { width: this.ySize, height: this.xSize };
  }

  private getCoordinates(str: CellsType) {
    for (let i = 0; i < this.mapAsStrings.length; i++) {
      for (let j = 0; j < this.mapAsStrings[i].length; j++) {
        if (this.mapAsStrings[i][j] === str) {
          return { i, j };
        }
      }
    }
    return null;
  }

  getPacman() {
    const coordinates = this.getCoordinates('pacman');
    const pacman = new Pacman(
      this.getMapAsStrings(),
      {
        x: coordinates?.j || 0,
        y: coordinates?.i || 0,
      },
      this.cellSize
    );

    return pacman;
  }

  getEnemies() {
    const enemies: Enemy[] = [];

    enemiesNames.forEach(item => {
      const coordinates = this.getCoordinates(item);
      const obj = enemiesConfig.find(el => {
        return el[item];
      });

      if (obj?.[item]) {
        const enemieConfig = obj?.[item];
        const enemy = new Enemy(
          enemieConfig!.icon,
          this.getMapAsStrings(),
          {
            x: coordinates?.j || 0,
            y: coordinates?.i || 0,
          },
          this.cellSize,
          enemieConfig!.path,
          enemieConfig!.activationTime
        );

        enemies.push(enemy);
      }
    });
    return enemies;
  }
}
