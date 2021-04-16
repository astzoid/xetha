import { config } from 'dotenv';
config();

import './auth/OAuth2';
import passport from 'passport';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import session from 'express-session';
import API from './api/v1';
import { corsOptions, rateLimitOptions, sessionOptions } from './utils/Constants';
import Logger from './utils/Logger';
import { makeCatcher } from '@xetha/async-wrapper';
import processor from '@xetha/processor';

processor(Logger);

const app = express();

app.set('trust proxy', '127.0.0.1');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

app.use(rateLimit(rateLimitOptions));

app.use('/api', API);

app.use(makeCatcher(Logger));

app.listen(3001, () => Logger.info(`Listening on PORT 3001`));