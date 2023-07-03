import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
//@ts-ignore
import browserEnv from 'browser-env';

dotenv.config();

import express from 'express';
import { createClientAndConnect } from './db';

const app = express();
const distPath = path.dirname(
  path.resolve('node_modules/client/dist/index.html')
);
const ssrDistPath = path.resolve('node_modules/client/ssr-dist/client.cjs');
const port = Number(process.env.SERVER_PORT) || 3001;

app.use(cors());

createClientAndConnect();

app.get('/api', (_, res) => {
  res.json('👋 Howdy from the server :)');
});

app.use('/assets', express.static(path.resolve(distPath, 'assets')));

app.use('*', async (_, res, next) => {
  browserEnv(['document', 'window', 'navigator', 'Image']);
  try {
    const template = fs.readFileSync(
      path.resolve(distPath, 'index.html'),
      'utf-8'
    );
    const { render } = await import(ssrDistPath);
    const appHTML = await render();
    const html = template.replace('<!--ssr-content-->', appHTML);

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  } catch (e) {
    next(e);
  }
});

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
});
