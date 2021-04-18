import { Router } from 'express';

import gateway from '../../middlewares/gateway';

import commands from './routes/commands';
import guild from './routes/guild';
import invite from './routes/invite';
import login from './routes/login';
import logout from './routes/logout';
import redirect from './routes/redirect';
import status from './routes/status';
import user from './routes/user';

const app = Router();

app.use('/commands', commands);

app.use('/invite', invite);

app.use('/login', login);

app.use('/logout', logout);

app.use('/redirect', redirect);

app.use('/status', status);

app.use('/user', user);

app.use(gateway);

app.use('/guild', guild);

export default app;
