import express from 'express';
import { userRouter, topicRouter, commentRouter } from './';

export const apiRouter = express.Router();

userRouter(apiRouter);
topicRouter(apiRouter);
topicRouter(apiRouter);
commentRouter(apiRouter);
