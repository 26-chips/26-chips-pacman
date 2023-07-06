import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStaticHandler } from '@remix-run/router';
import {
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server';
import { matchPath } from 'react-router-dom';
import { createStore } from 'app/store';
import { childrenRoutes, routes } from 'router';
import express from 'express';

export function createFetchHeaders(
  requestHeaders: express.Request['headers']
): Headers {
  const headers = new Headers();

  for (const [key, values] of Object.entries(requestHeaders)) {
    if (values) {
      if (Array.isArray(values)) {
        for (const value of values) {
          headers.append(key, value);
        }
      } else {
        headers.set(key, values);
      }
    }
  }

  return headers;
}

export function createFetchRequest(req: express.Request): Request {
  const origin = `${req.protocol}://${req.get('host')}`;
  // Note: This had to take originalUrl into account for presumably vite's proxying
  const url = new URL(req.originalUrl || req.url, origin);

  const controller = new AbortController();

  req.on('close', () => {
    controller.abort();
  });

  const init: RequestInit = {
    method: req.method,
    headers: createFetchHeaders(req.headers),
    signal: controller.signal,
  };

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = req.body;
  }

  return new Request(url.href, init);
}

export async function render(request: express.Request, url: string) {
  const { query } = createStaticHandler(routes);
  const remixRequest = createFetchRequest(request);
  const context = await query(remixRequest);

  if (context instanceof Response) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw context;
  }

  const router = createStaticRouter(routes, context);

  const [pathname] = url.split('?');
  const store = createStore(request?.headers?.cookie);

  const currentRoute = childrenRoutes.find(({ path }) =>
    matchPath(pathname, path)
  );
  const { loader } = currentRoute || {};

  if (loader) {
    await loader(store.dispatch);
  }

  const initialState = store.getState();

  const appHtml = renderToString(
    <Provider store={store}>
      <StaticRouterProvider
        router={router}
        context={context}
        nonce="the-nonce"
      />
    </Provider>
  );

  return [initialState, appHtml];
}
