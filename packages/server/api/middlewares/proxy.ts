/* eslint-disable @typescript-eslint/no-unused-vars */
import type { RequestHandler } from 'express';
import {
  createProxyMiddleware,
  responseInterceptor,
} from 'http-proxy-middleware';

export const proxyMiddleware: RequestHandler = (req, res, next) => {
  // Если обращение к API идёт из незнакомого места - отклоняем
  console.log('REQURL', req.url);
  if (req.url.includes('/auth/user') && req.method === 'GET') {
    createProxyMiddleware({
      target: 'https://ya-praktikum.tech/api/v2',
      pathRewrite: { '^/api': '' },
      changeOrigin: true,
      cookieDomainRewrite: { 'ya-praktikum.tech': req.hostname },
      selfHandleResponse: true,
      logLevel: 'error',
      onProxyRes: responseInterceptor(
        async (responseBuffer, _proxyRes, _req, _res) => {
          console.log('PROXY1');
          const response = responseBuffer.toString(); // convert buffer to string
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
    })(req, res, err => {
      if (err) {
        next(err);
      } else {
        next();
      }
    });
  } else {
    next();
  }
};

export const apiProxy = createProxyMiddleware({
  target: 'https://ya-praktikum.tech/api/v2',
  cookieDomainRewrite: { 'ya-praktikum.tech': 'req.hostname' },
  logLevel: 'debug',
  changeOrigin: true,
  pathRewrite: function (path, req) {
    console.log('apiProxy');
    if (req.hostname == 'localwebapp') {
      return '/123';
    }
    if (req.hostname == 'localwebapp2') {
      return '/abc';
    }
    return path;
  },
});
