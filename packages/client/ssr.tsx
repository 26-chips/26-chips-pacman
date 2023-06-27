import { renderToString } from 'react-dom/server';
import App from './src/App';

export const render = () => {
  return renderToString(<App />);
};
