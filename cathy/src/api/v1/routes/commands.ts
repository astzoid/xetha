import { Router } from 'express';
import AsyncWrapper from '@oadpoaw/async-wrapper';
import REST from '../../../functions/REST';

const commands = Router();

type Commands = {
    name: string;
    description: string;
    usage: string[];
    category: string;
    aliases: string[];
}[];

let cmds: Commands = [];

commands.get(
    '/',
    AsyncWrapper(async (_req, res) => {
        if (cmds.length) return res.status(200).json(cmds);

        const response = await REST.get({
            route: '/api/commands',
        }).then((res) => res);

        cmds = response.body;

        return res.status(200).json(cmds);
    }),
);

export default commands;
