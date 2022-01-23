import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import '@src/infra/config/EnvConfig';
import { routes } from '@src/infra/routes';
import { errorHandler } from '@src/util/error/ErrorHandler';

const server = express();

server.use(
  cors({
    origin: `${process.env.GATEWAY_URL}`,
  }),
);
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(logger('dev'));
server.use(routes);
server.use(errorHandler);

export { server };
