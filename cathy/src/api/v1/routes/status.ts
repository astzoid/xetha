import { Router } from 'express';
import AsyncWrapper from '@oadpoaw/async-wrapper';
import REST from '../../../functions/REST';
import type { Shard } from '@shared/types';

const status = Router();

status.get(
    '/',
    AsyncWrapper(async (_req, res) => {
        const response = await REST.get<Shard[]>({
            route: '/api/status',
        });

        return res.status(200).json(response.body);
    }),
);

export default status;
