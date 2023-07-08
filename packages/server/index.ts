import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
//@ts-ignore
import browserEnv from 'browser-env';
import { createServer, ViteDevServer } from 'vite';
import { dbConnect } from './api/db';
import { apiRouter } from './api/router/router';
import bodyParser from 'body-parser';

dotenv.config();

import express from 'express';
// import { createClientAndConnect } from './db';

//const app = express();


async function startServer() {
  const distPath = path.dirname(require.resolve('client/dist/index.html'));
  const srcPath = path.dirname(require.resolve('client'));
  const ssrDistPath = require.resolve('client/ssr-dist/client.cjs');
  const port = Number(process.env.SERVER_PORT) || 3001;
  const isDev = process.env.NODE_ENV === 'development';
  let vite: ViteDevServer | undefined;

  const app = express();
  dbConnect();

  app.use(cors());

  if (isDev) {
    vite = await createServer({
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

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;

    browserEnv(['document', 'window', 'navigator', 'Image', 'Audio']);

    try {
      let template = fs.readFileSync(
        path.resolve(isDev ? srcPath : distPath, 'index.html'),
        'utf-8'
      );

      let render: (url: string) => Promise<string>;

      if (isDev) {
        template = await vite!.transformIndexHtml(url, template);
        render = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx')))
          .render;
      } else {
        render = (await import(ssrDistPath)).render;
      }

      const appHTML = await render(url);

      const html = template.replace('<!--ssr-content-->', appHTML);

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

  const bParser = bodyParser.json();

  app.use(cors()).use(bParser).use('/api', apiRouter);


  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
  });
}

startServer();
