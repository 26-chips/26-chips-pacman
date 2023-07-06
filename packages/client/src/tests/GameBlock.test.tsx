import { GameBlock } from 'pages/GamePage/Components/GameBlock';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { create } from 'react-test-renderer';
import { createStore } from '../app/store';
import { Provider } from 'react-redux';

const mockComponent = (
  <Provider store={createStore()}>
    <BrowserRouter>
      <GameBlock />
    </BrowserRouter>
  </Provider>
);

describe('<GameBlock />', () => {
  it('Should render', () => {
    render(mockComponent);
  });

  it('Should contain canvas element', () => {
    const { container } = render(mockComponent);
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });

  it('Should match snapshot', () => {
    const tree = create(mockComponent).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
