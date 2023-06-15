import { Pacman } from 'components/Canvas/Pacman';
import { DirectionsType } from 'components/Canvas/consts';
import { mapStrStub } from './Map.test';

const pacman = new Pacman(mapStrStub, { x: 0, y: 0 }, 0);
const initialPosition = pacman.getPosition();

describe('Pacman', () => {
  it('getPosition()', () => {
    pacman.updateDirection(DirectionsType.down);
    pacman.updatePosition();

    const newPos = pacman.getPosition();

    expect(newPos).toEqual(initialPosition);
  });
});
