import { Server as WebSocketServer } from 'socket.io';
import http from 'http';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import Logger from '../utils/Logger';

import CommandsRoute from './routes/CommandsRoute';
import GuildRoute from './routes/GuildRoute';
import MemberRoute from './routes/MemberRoute';
import StatusRoute from './routes/StatusRoute';
import UserRoute from './routes/UserRoute';

import type { DisclosureSharder } from 'disclosure-discord';

function getWSSecret() {
    return process.env.WEBSOCKET_SECRET ?? '123';
}

export default function Server(manager: DisclosureSharder) {
    const server = http.createServer(
        express()
            .set('trust proxy', '127.0.0.1')
            .use(helmet())
            .use(cors())
            .use((_req, res) => {
                res.status(200).json({ message: 'You found an easter egg #3' });
            }),
    );

    const io = new WebSocketServer(server);

    io.on('connection', (socket) => {
        const { query } = socket.handshake;
        const key = query.key as string;
        if (typeof key !== 'string' && key !== getWSSecret()) {
            Logger.info(
                `[cathy] ${socket.handshake.address} tried to connect.`,
            );
            socket.disconnect();
        } else {
            Logger.info(
                `[cathy] ${socket.id} ${socket.handshake.address} connected.`,
            );

            CommandsRoute(manager, socket);
            GuildRoute(manager, socket);
            MemberRoute(manager, socket);
            StatusRoute(manager, socket);
            UserRoute(manager, socket);

            socket.on('message', (message: string) => {
                Logger.info(`[cathy]${socket.id} ${message}`);
            });

            socket.on('error', (error: Error) => {
                Logger.error(`[cathy] ${socket.id} error occured:`, error);
            });

            socket.on('disconnect', (reason: string) => {
                Logger.info(`[cathy]${socket.id} disconnected: ${reason}`);
            });

            socket.on('disconnecting', (reason: string) => {
                Logger.info(`[cathy]${socket.id} disconnecting: ${reason}`);
            });
        }
    });

    server.listen(3002);
}
