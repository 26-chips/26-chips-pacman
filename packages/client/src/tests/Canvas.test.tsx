import { CanvasComponent } from 'components';
import { render } from '@testing-library/react';
import { create } from 'react-test-renderer';

const setPoints = jest.fn();
const reduceLives = jest.fn();
const setTime = jest.fn();
const setMaximumPoints = jest.fn();
const resetCounter = jest.fn();
const setIsPaused = jest.fn();

const CanvasProps = {
  setPoints: setPoints,
  reduceLives: reduceLives,
  setTime: setTime,
  isPaused: false,
  isCountDown: false,
  allPillsCollected: false,
  setIsPaused: setIsPaused,
  resetCounter: resetCounter,
  setMaximumPoints: setMaximumPoints,
};

export const mockCanvas = <CanvasComponent {...CanvasProps} />;

describe('<CanvasComponent />', () => {
  it('Should render', () => {
    const canvas = render(mockCanvas);
    expect(canvas.container).toBeInTheDocument();
  });

  it('Should match snapshot', () => {
    const tree = create(mockCanvas).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
