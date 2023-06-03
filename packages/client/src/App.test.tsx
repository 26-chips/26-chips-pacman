import App from './App';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { screen } from '@testing-library/dom';

const appContent = 'Начнем?';

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
);

test('Example test', async () => {
  render(<App />);
  await waitFor(() => {
    expect(screen.getByText(appContent)).toBeInTheDocument();
  });
});
