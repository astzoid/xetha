import '@shared/env';

import processor from '@oadpoaw/processor';
import { makeCatcher } from '@oadpoaw/async-wrapper';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

import AuthService from './auth/AuthService';
import Logger from './utils/Logger';
import { corsOptions } from './utils/Constants';
import WebSocketHandler from './ws/WebSocketHandler';

processor(Logger);

const server = http.createServer(
    express()
        .set('trust proxy', 'loopback')
        .use(express.json())
        .use(express.urlencoded({ extended: true }))
        .use(helmet())
        .use(cors(corsOptions))
        .get('/', (_req, res) => {
            res.status(200).json({ message: 'Great! you found easter egg #6' });
        })
        .use('/api', AuthService)
        .use(makeCatcher(Logger)),
);

const io = new Server(server, {
    cors: corsOptions,
});

io.on('connection', WebSocketHandler);

server.listen(3001, () => Logger.info(`Listening on PORT 3001`));
