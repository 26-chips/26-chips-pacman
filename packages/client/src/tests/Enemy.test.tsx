import { Enemy } from 'components/Canvas/Enemy';
import { mapStrStub } from './Map.test';
import { pathCycleStub } from './helpers.test';

const startPosition = {
  x: 0,
  y: 0,
};

const enemy = new Enemy(
  new Image(),
  mapStrStub,
  startPosition,
  1,
  pathCycleStub,
  0
);

describe('Enemy', () => {
  it('Should update position', async () => {
    enemy.updateTime();
    enemy.updatePosition();

    const newPosition = enemy.getPosition();
    expect(newPosition).not.toEqual(startPosition);
  });
});
