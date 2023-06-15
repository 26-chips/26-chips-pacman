import { CanvasComponent } from 'components';
import { render } from '@testing-library/react';
import { create } from 'react-test-renderer';

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
    const canvas = render(<CanvasComponent {...CanvasProps} />);
    expect(canvas.container).toBeInTheDocument();
  });

  it('Should match snapshot', () => {
    const tree = create(<CanvasComponent {...CanvasProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
