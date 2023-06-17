import { Pacman } from 'components/Canvas/Pacman';
import { pacmanSpritesConfig } from 'components/Canvas/consts';
import { mapStrStub } from './Map.test';
import { formSpritesConfig } from 'components/Canvas/helpers';

const startPosition = { x: 0, y: 0 };

const pacman = new Pacman(
  mapStrStub,
  startPosition,
  0,
  formSpritesConfig(pacmanSpritesConfig, startPosition)
);

describe('Pacman', () => {
  it('Should contains initial position', () => {
    const newPosition = pacman.getPosition();
    expect(newPosition).toEqual(startPosition);
  });
});
