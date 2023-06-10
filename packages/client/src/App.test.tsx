import App from './App';
import { render, screen, waitFor } from '@testing-library/react';

const appContent = 'Main Page';

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
);

test('Example test', async () => {
  render(<App />);
  await waitFor(() => expect(screen.getByText(appContent)).toBeDefined());
});
