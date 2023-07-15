import App from '../App';
import { render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'app/store';

const appContent = 'Наш github репозиторий';

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
);

test('Example test', async () => {
  const app = render(
    <Provider store={createStore()}>
      <App />
    </Provider>
  );

  await waitFor(() => expect(app.getByText(appContent)).toBeDefined());
});
