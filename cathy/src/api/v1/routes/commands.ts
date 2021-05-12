import { Router } from 'express';
import AsyncWrapper from '@oadpoaw/async-wrapper';
import REST from '../../../functions/REST';
import type { Command } from '@shared/types';

const commands = Router();

let cmds: Command[] = [];

commands.get(
    '/',
    AsyncWrapper(async (_req, res) => {
        if (cmds.length) return res.status(200).json(cmds);

        const response = await REST.get<Command[]>({
            route: '/api/commands',
        });

        cmds = response.body;

        return res.status(200).json(cmds);
    }),
);

export default commands;
