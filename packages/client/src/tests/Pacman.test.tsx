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
  });
});
