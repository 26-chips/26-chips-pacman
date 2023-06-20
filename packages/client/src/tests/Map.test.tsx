import { Map } from 'components/Canvas/Map';
import { mapString } from 'components/Canvas/lvl1';

const map = new Map(mapString);

export const mapBlkStub = map.fillMapAsBlocks(mapString);

export const mapStrStub = map.fillMapAsStrings(mapString);
describe('Map', () => {
  it('fillMapAsBlocks() should return map', () => {
    expect(mapBlkStub).toBeDefined();
  });

  it('fillMapAsStrings() should return map', () => {
    expect(mapStrStub).toBeDefined();
  });

  it('getTotalPoints should return positive int', () => {
    expect(map.getTotalPoints()).toBeGreaterThan(0);
  });
});
