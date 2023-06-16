import { isCollidesSquare, makePathCycle } from 'components/Canvas/helpers';
import { PathType } from 'components/Canvas/Enemy';

// todo fix consts nested import/export (jest fail)
jest.mock('components/Canvas/consts', () => {
  return {
    DirectionsType: {
      up: 'up',
      down: 'down',
      left: 'left',
      right: 'right',
      still: 'still',
    },
  };
});
enum DirectionsType {
  up = 'up',
  down = 'down',
  left = 'left',
  right = 'right',
  still = 'still',
}
export const pathCycleStub = makePathCycle([
  { direction: DirectionsType.up, steps: 3 },
  { direction: DirectionsType.down, steps: 3 },
]);

describe('Helpers', () => {
  describe('isCollidesSquare()', () => {
    it('Should collides', () => {
      const isCollides = isCollidesSquare(0, 0, 10, 5, 5, 10);
      expect(isCollides).toEqual(true);
    });
    it('Should not collides', () => {
      const isCollides = isCollidesSquare(0, 0, 10, 20, 20, 10);
      expect(isCollides).toEqual(false);
    });
  });

  describe('makePathCycle()', () => {
    it('Used path must be cycled', () => {
      if (pathCycleStub.length === 0) {
        fail('Path length must be greater than 0');
      }

      const isPathCycled = (arr: PathType) => {
        let counter = 0;
        const dirQueue = [];

        for (let i = 0; i < arr.length; i++) {
          const { steps, direction } = arr[i];
          if (i < arr.length / 2) {
            counter += steps;
            dirQueue.push(direction);
          } else {
            counter -= steps;
            if (dirQueue.shift() !== direction) {
              throw new Error('Wrong direction in cycle');
            }
          }
        }

        return counter;
      };

      expect(isPathCycled(pathCycleStub)).toBe(0);
    });
  });
});
