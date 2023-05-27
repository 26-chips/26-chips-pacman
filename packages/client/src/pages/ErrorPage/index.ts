import { lazy } from 'react';

export const ErrorPage = lazy(
  () => /* webpackChunkName: "HeavyComponent" */ import('./ErrorPage')
);
