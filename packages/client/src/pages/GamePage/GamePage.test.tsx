import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GamePage } from './index';
import { BrowserRouter } from 'react-router-dom';

const mockComponent = (
  <BrowserRouter>
    <GamePage />
  </BrowserRouter>
);

describe('<GamePage />', () => {
  it('Should render', async () => {
    //await lazy load https://github.com/testing-library/react-testing-library/issues/1216
    let container;
    await act(() => {
      container = render(mockComponent);
    });
    if (container) {
      // @ts-ignore
      expect(container.getByText(/Time/i)).toBeDefined();
    } else {
      fail('Page not render properly (or not contains "Time" string)');
    }
  });

  it('Should contain canvas', async () => {
    const container = await render(mockComponent);
    const canvas = container.getByTestId('game-canvas');
    expect(canvas).toBeDefined();
  });
});
