/* eslint-disable @typescript-eslint/no-unused-vars */
import type { RequestHandler } from 'express';
import {
  createProxyMiddleware,
  responseInterceptor,
} from 'http-proxy-middleware';

export const proxyMiddleware: RequestHandler = createProxyMiddleware({
  target: 'https://ya-praktikum.tech',
  // pathRewrite: { '^/api/v2': '/v2' },
  changeOrigin: true,
  cookieDomainRewrite: 'localhost',
  selfHandleResponse: true,
  logLevel: 'debug',
  onProxyRes: responseInterceptor(
    async (responseBuffer, _proxyRes, _req, _res) => {
      const response = responseBuffer.toString();
      console.log('response', response);
      let user;
      try {
        user = JSON.parse(response);
      } catch (e) {
        user = null;
      }
      if (user && user.id) {
        console.log('USER');
      }
      return responseBuffer;
    }
  ),
});
