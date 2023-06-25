import { isCollidesSquare, makePathCycle } from 'components/Canvas/helpers';
import { PathType } from 'components/Canvas/Enemy';

// todo fix consts nested import/export (jest fail)
enum DirectionsType {
  up = 'up',
  down = 'down',
  left = 'left',
  right = 'right',
  still = 'still',
}
const directions = {
  [DirectionsType.down]: DirectionsType.up,
  [DirectionsType.up]: DirectionsType.down,
  [DirectionsType.left]: DirectionsType.right,
  [DirectionsType.right]: DirectionsType.left,
  [DirectionsType.still]: DirectionsType.still,
};

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

export const pathCycleStub = makePathCycle([
  { direction: DirectionsType.up, steps: 3 },
  { direction: DirectionsType.left, steps: 3 },
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
        const pathStack = [];

        for (let i = 0; i < arr.length; i++) {
          const { steps, direction } = arr[i];
          if (i < arr.length / 2) {
            pathStack.push(arr[i]);
          } else {
            const stackPath = pathStack.pop();

            if (stackPath?.steps !== steps) {
              console.log(
                'Wrong number of steps, expect',
                stackPath?.steps,
                'got',
                steps
              );
              return false;
            }

            if (stackPath?.direction !== directions[direction]) {
              console.log(
                'Wrong direction, expect',
                stackPath?.direction,
                'got',
                directions[direction]
              );
              return false;
            }
          }
        }

        return true;
      };

      expect(isPathCycled(pathCycleStub)).toBe(true);
    });
  });
});
