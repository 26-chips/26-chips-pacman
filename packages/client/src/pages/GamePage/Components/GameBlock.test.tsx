import { GameBlock } from './GameBlock';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

const mockComponent = (
  <BrowserRouter>
    <GameBlock />
  </BrowserRouter>
);

describe('<GameBlock />', () => {
  it('Should render', () => {
    render(mockComponent);
  });

  it('Should contain canvas element', () => {
    const { container } = render(mockComponent);
    expect(container.querySelector('canvas')).toBeDefined();
  });
});
