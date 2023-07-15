import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import React from 'react';
import cookieParser from 'cookie-parser';
import browserEnv from 'browser-env';
import { createServer as createViteServer, type ViteDevServer } from 'vite';
import { createProxyMiddleware } from 'http-proxy-middleware';
import express from 'express';
// import { createClientAndConnect } from './db';

React.useLayoutEffect = React.useEffect;

dotenv.config();

interface SSRModule {
  render: (req: express.Request, url: string) => Promise<string>;
}

async function startServer() {
  const distPath = path.dirname(require.resolve('client/dist/index.html'));
  const srcPath = path.dirname(require.resolve('client'));
  const ssrDistPath = require.resolve('client/ssr-dist/client.cjs');
  const port = Number(process.env.SERVER_PORT) || 3001;
  const isDev = process.env.NODE_ENV === 'development';
  let vite: ViteDevServer | undefined;

  const app = express();

  app.use(cors());

  app.use(
    '/api/v2/*',
    createProxyMiddleware({
      changeOrigin: true,
      cookieDomainRewrite: {
        '*': '',
      },
      target: 'https://ya-praktikum.tech',
    })
  );

  if (isDev) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    });

    app.use(vite.middlewares);
  }

  if (!isDev) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')));
    app.use('/app.js', express.static(path.resolve(distPath, 'app.js')));
    app.use('/sw.js', express.static(path.resolve(distPath, 'sw.js')));
  }

  app.use('*', cookieParser(), async (req, res, next) => {
    const url = req.originalUrl;

    browserEnv(['document', 'window', 'navigator', 'Image', 'Audio']);

    try {
      let template = fs.readFileSync(
        path.resolve(isDev ? srcPath : distPath, 'index.html'),
        'utf-8'
      );

      let mod: SSRModule;

      if (isDev) {
        template = await vite!.transformIndexHtml(url, template);
      }

      if (isDev) {
        mod = (await vite!.ssrLoadModule(
          path.resolve(srcPath, 'ssr.tsx')
        )) as SSRModule;
      } else {
        mod = await import(ssrDistPath);
      }

      const { render } = mod;

      const [initialState, appHTML] = await render(req, url);
      const initStateSerialized = JSON.stringify(initialState);

      const html = template
        .replace('<!--ssr-content-->', appHTML)
        .replace('<!--store-data-->', initStateSerialized);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      if (isDev) {
        vite!.ssrFixStacktrace(e as Error);
      } else {
        next(e);
      }
    }
  });

  // createClientAndConnect();

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
  });
}

startServer();
