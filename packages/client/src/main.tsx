import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore } from 'app/store';
import App from './App';
import './styles.module.scss';

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <Provider store={createStore()}>
      <App />
    </Provider>
  </React.StrictMode>
);
