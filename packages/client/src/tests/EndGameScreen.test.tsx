import { EndGameScreen } from 'components';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { create } from 'react-test-renderer';

const EGSProps = {
  username: 'test',
  show: false,
  onClose: jest.fn(),
  score: '999',
  elapsedTimeSec: '999',
};

const EGSMock = () => {
  return (
    <BrowserRouter>
      <EndGameScreen {...EGSProps} />
    </BrowserRouter>
  );
};

describe('<EndGameScreen />', () => {
  it('Should display only on show', () => {
    const hiddenRender = render(<EGSMock />);
    expect(hiddenRender.queryByText(EGSProps.username)).toBeNull();

    EGSProps.show = true;

    const shownRender = render(<EGSMock />);
    expect(shownRender.queryByText(EGSProps.username)?.textContent).toEqual(
      EGSProps.username
    );
  });

  // EGSProps.show must be true
  it('Should match snapshot', () => {
    const tree = create(<EGSMock />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
