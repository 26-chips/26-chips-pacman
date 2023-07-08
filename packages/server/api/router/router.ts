import express from 'express';
import { userRouter, topicRouter } from './';

export const apiRouter = express.Router();

userRouter(apiRouter);
topicRouter(apiRouter);
