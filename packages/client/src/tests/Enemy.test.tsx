import { Enemy } from 'components/Canvas/Enemy';
import { mapStrStub } from './Map.test';
import { pathCycleStub } from './helpers.test';
import { formSpritesConfig } from 'components/Canvas/helpers';
import { pacmanSpritesConfig } from 'components/Canvas/consts';

const startPosition = { x: 0, y: 0 };

const enemy = new Enemy(
  mapStrStub,
  startPosition,
  1,
  formSpritesConfig(pacmanSpritesConfig, startPosition),
  pathCycleStub,
  0
);

describe('Enemy', () => {
  it('Should contains initial position', () => {
    const newPosition = enemy.getPosition();
    expect(newPosition).toEqual(startPosition);
  });
});
