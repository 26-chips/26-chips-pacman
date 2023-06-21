import { Pacman } from 'components/Canvas/Pacman';
import { DirectionsType, pacmanSpritesConfig } from 'components/Canvas/consts';
import { mapStrStub } from './Map.test';
import { formSpritesConfig } from 'components/Canvas/helpers';

const startPosition = { x: 0, y: 0 };

export const pacman = new Pacman(
  mapStrStub,
  startPosition,
  10,
  formSpritesConfig(pacmanSpritesConfig, startPosition)
);

const pacmanPosition = pacman.getPosition();

describe('Pacman', () => {
  it('Should contains initial position', () => {
    expect(pacmanPosition).toEqual(startPosition);
  });

  describe('Movement', () => {
    it('Should be still', () => {
      const isStill = pacman.getIsStill();
      expect(isStill).toEqual(true);
    });

    it('Should not be still', () => {
      pacman.updateDirection(DirectionsType.down);
      const isStill = pacman.getIsStill();
      expect(isStill).toEqual(false);
    });

    it('Should change position', () => {
      pacman.updateDirection(DirectionsType.left);

      //check if direction updated
      expect(pacman.getIsStill()).toEqual(false);
      expect(pacman.isStopped).toEqual(false);

      //first call updatePosition() not change position (initial x = 0, less than step = 5 (default))
      //next position = this.field[0].length * this.cellSize - this.cellSize / 2;
      //this.field[0].length = 13; cellSize = 10;
      pacman.updatePosition();
      pacman.updatePosition();

      const newPosition = pacman.getPosition();
      expect(newPosition).not.toEqual(startPosition);
    });

    it('Should reset position', () => {
      pacman.updateDirection(DirectionsType.left);
      pacman.updatePosition();
      pacman.updatePosition();

      const currentPosition = pacman.getPosition();
      expect(currentPosition).not.toEqual(startPosition);

      pacman.reset();
      const resetPosition = pacman.getPosition();
      expect(resetPosition).toEqual(startPosition);
    });
  });
});
