import { EndGameScreen } from './EndGameScreen';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

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
  it('Should render', () => {
    render(<EGSMock />);
  });

  it('Should display only on show', () => {
    render(<EGSMock />);
    expect(screen.queryByText(EGSProps.username)).toBeNull();
    EGSProps.show = true;
    render(<EGSMock />);
    expect(screen.queryByText(EGSProps.username)?.textContent).toEqual(
      EGSProps.username
    );
  });
});
