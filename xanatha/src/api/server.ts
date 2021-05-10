import { makeCatcher } from '@oadpoaw/async-wrapper';
import type { DisclosureSharder } from 'disclosure-discord';
import express from 'express';
import Logger from '../utils/Logger';
import CommandsRoute from './routes/CommandsRoute';
import GuildRoute from './routes/GuildRoute';
import MemberRoute from './routes/MemberRoute';
import StatusRoute from './routes/StatusRoute';
import UserRoute from './routes/UserRoute';

export default function Server(manager: DisclosureSharder) {
    const app = express();

    app.use(express.json());

    app.use(express.urlencoded({ extended: false }));

    app.get('/', (_req, res) =>
        res.status(200).json({ message: 'Xetha is currently online' }),
    );

    app.use('/api/commands', CommandsRoute(manager));

    app.use('/api/guild', GuildRoute(manager));

    app.use('/api/member', MemberRoute(manager));

    app.use('/api/status', StatusRoute(manager));

    app.use('/api/user', UserRoute(manager));

    app.use(makeCatcher(Logger));

    app.listen(3002, () =>
        manager.logger.info(`[SERVER] API Listening on PORT 3002`),
    );
}
