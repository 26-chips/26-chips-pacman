import { render, act } from '@testing-library/react';
import { GamePage } from 'pages';
import { BrowserRouter } from 'react-router-dom';
import { create } from 'react-test-renderer';

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
    const { container } = await render(mockComponent);
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });

  it('Should match snapshot', () => {
    const tree = create(mockComponent).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
