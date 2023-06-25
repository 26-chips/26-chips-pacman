import { Enemy } from 'components/Canvas/Enemy';
import { map, mapStrStub } from './Map.test';
import { pathCycleStub } from './helpers.test';
import { formSpritesConfig } from 'components/Canvas/helpers';
import { pacmanSpritesConfig } from 'components/Canvas/consts';
import { pacman } from './Pacman.test';

const startPosition = { x: 0, y: 0 };
const pacmanPosition = pacman.getPosition();
const enemy = map.getEnemies()[0];

const stubEnemy = new Enemy(
  mapStrStub,
  startPosition,
  10,
  formSpritesConfig(pacmanSpritesConfig, startPosition),
  pathCycleStub,
  3
);

describe('Enemy', () => {
  it('Should contains initial position', () => {
    const newPosition = stubEnemy.getPosition();
    expect(newPosition).toEqual(startPosition);
  });

  it('Should reset position', () => {
    const initPosition = { ...enemy.getPosition() };

    // update time to start enemy (default timeout - 3)
    enemy.updateTime(4);
    enemy.updatePosition();

    const updatedPosition = { ...enemy.getPosition() };
    expect(updatedPosition).not.toEqual(initPosition);

    enemy.reset();

    const resetedPosition = { ...enemy.getPosition() };
    expect(resetedPosition).toEqual(initPosition);
  });

  it('Should stop', () => {
    const initPosition = { ...enemy.getPosition() };

    enemy.updateTime(4);
    enemy.stop();
    // updatePosition() should not change position
    enemy.updatePosition();

    const updatedPosition = { ...enemy.getPosition() };
    expect(updatedPosition).toEqual(initPosition);
  });

  describe('Collide with pacman', () => {
    it('Should collide', () => {
      expect(
        stubEnemy.getCollisionWithPacman(pacmanPosition.x, pacmanPosition.y)
      ).toEqual(true);
    });

    it('Should not collide', () => {
      expect(
        enemy.getCollisionWithPacman(pacmanPosition.x, pacmanPosition.y)
      ).toEqual(false);
    });
  });
});
