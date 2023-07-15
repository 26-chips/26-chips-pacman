import { configureStore } from '@reduxjs/toolkit';

import { apiSlice } from 'api/apiSlice';

export const createStore = (cookie?: string) => {
  const preloadedState =
    typeof window !== 'undefined' ? window.__PRELOADED_STATE__ : undefined;

  if (typeof window !== 'undefined') {
    delete window.__PRELOADED_STATE__;
  }

  return configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    preloadedState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: cookie,
        },
      }).concat(apiSlice.middleware),
  });
};

export type AppDispatch = ReturnType<typeof createStore>['dispatch'];
export type RootState = ReturnType<typeof createStore>['getState'];
