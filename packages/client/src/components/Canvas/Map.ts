import { Wall, Pill, Empty, BigPill } from './blocks';
import { CellsType, bigPillPoints, smallPillPoints } from './consts';
import { Pacman } from './Pacman';
import { Enemy } from './Enemy';
import { enemiesConfig } from './consts';

import { pacmanSpritesConfig } from './consts';
import { formSpritesConfig } from './helpers';

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
export type EnemiesNamesType = Extract<CellsType, CellsType.pinky | CellsType.blinky | CellsType.inky | CellsType.clyde>;

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
  '#': CellsType.wall,
  '.': CellsType.smallPill,
  ' ': CellsType.empty,
  '*': CellsType.bigPill,
  G: CellsType.pacman,
  P: CellsType.pinky,
  B: CellsType.blinky,
  I: CellsType.inky,
  C: CellsType.clyde,
};

const enemiesNames: EnemiesNamesType[] = [
  CellsType.pinky,
  //CellsType.blinky,
  CellsType.inky,
  CellsType.clyde,
];

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

  private fillMapAsBlocks(str: string) {
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

  getTotalPoints() {
    let total = 0;

    for (const row of this.mapAsStrings) {
      for (const item of row) {
        if (item === CellsType.smallPill) {
          total += smallPillPoints;
        }
        if (item === CellsType.bigPill) {
          total += bigPillPoints;
        }
      }
    }

    return total;
  }

  private fillMapAsStrings(str: string) {
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
    const coordinates = this.getCoordinates(CellsType.pacman);
    const pacman = new Pacman(
      this.getMapAsStrings(),
      {
        x: coordinates?.j || 0,
        y: coordinates?.i || 0,
      },
      this.cellSize,
      formSpritesConfig(pacmanSpritesConfig, {
        x: (coordinates?.j || 0) * this.cellSize,
        y: (coordinates?.i || 0) * this.cellSize,
      })
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
          this.getMapAsStrings(),
          {
            x: coordinates?.j || 0,
            y: coordinates?.i || 0,
          },
          this.cellSize,
          formSpritesConfig(enemieConfig!.icon, {
            x: (coordinates?.j || 0) * this.cellSize,
            y: (coordinates?.i || 0) * this.cellSize,
          }),
          enemieConfig!.path,
          enemieConfig!.activationTime
        );

        enemies.push(enemy);
      }
    });
    return enemies;
  }
}
