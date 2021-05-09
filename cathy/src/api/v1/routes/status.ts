import { Router } from 'express';
import RequestHandler from '../../../rest/RequestHandler';
import APIResponse from '../../../rest/APIResponse';
import { version } from '../../../utils/Constants';
import AsyncWrapper from '@xetha/async-wrapper';

const status = Router();

status.get(
    '/',
    AsyncWrapper(async (_req, res) => {
        const response = await RequestHandler.request('GET', {
            route: '/api/status',
        })
            .then((res) => res)
            .catch((err) => err);

        if (response instanceof APIResponse) {
            return res.status(200).json({
                version,
                uptime: process.uptime(),
                status: response.body,
            });
        }

        throw response;
    }),
);

export default status;
