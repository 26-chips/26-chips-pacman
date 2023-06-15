import { isCollidesSquare, makePathCycle } from './helpers';

// todo fix consts nested import/export (jest fail)
jest.mock('./consts', () => {
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
      const isCollides = isCollidesSquare(0, 0, 0, 0, 0, 0);
      expect(isCollides).toEqual(true);
    });
    it('Should not collides', () => {
      const isCollides = isCollidesSquare(0, 0, 0, 1, 1, 0);
      expect(isCollides).toEqual(false);
    });
  });

  describe('makePathCycle()', () => {
    it('Should return path', () => {
      expect(pathCycleStub).toBeDefined();
    });
  });
});
