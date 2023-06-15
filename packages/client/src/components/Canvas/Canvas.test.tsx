import { CanvasComponent } from './Canvas';
import { render } from '@testing-library/react';

const CanvasProps = {
  setPoints: jest.fn(),
  reduceLives: jest.fn(),
  setTime: jest.fn(),
  isPaused: false,
  isCountDown: true,
  allPillsCollected: false,
  setIsPaused: jest.fn(),
  resetCounter: jest.fn(),
  setMaximumPoints: jest.fn(),
};

describe('<CanvasComponent />', () => {
  it('Should render', () => {
    render(<CanvasComponent {...CanvasProps} />);
  });
});
