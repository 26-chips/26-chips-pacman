import { Pacman } from './Pacman';
import { DirectionsType } from './consts';
import { mapStrStub } from './Map.test';

const pacman = new Pacman(mapStrStub, { x: 0, y: 0 }, 0);
describe('Pacman', () => {
  test('getPosition()', () => {
    const initialPosition = pacman.getPosition();
    pacman.updateDirection(DirectionsType.down);
    pacman.updatePosition();
    const newPos = pacman.getPosition();
    expect(newPos).toEqual(initialPosition);
  });
});
