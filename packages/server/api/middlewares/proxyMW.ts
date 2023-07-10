/* eslint-disable @typescript-eslint/no-unused-vars */
import type { RequestHandler } from 'express';
import {
  createProxyMiddleware,
  responseInterceptor,
} from 'http-proxy-middleware';

export const proxyMW: RequestHandler = createProxyMiddleware({
  target: 'https://ya-praktikum.tech',
  secure: true,
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
