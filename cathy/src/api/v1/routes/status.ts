import { Router } from 'express';
import AsyncWrapper from '@oadpoaw/async-wrapper';
import { APIResponse } from '@shared/rest';
import REST from '../../../functions/REST';
import { version } from '../../../utils/Constants';

const status = Router();

status.get(
    '/',
    AsyncWrapper(async (_req, res) => {
        const response = await REST.get({
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
