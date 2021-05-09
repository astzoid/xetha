import { Router } from 'express';
import RequestHandler from '../../../rest/RequestHandler';
import APIResponse from '../../../rest/APIResponse';
import AsyncWrapper from '@xetha/async-wrapper';

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

        const response = await RequestHandler.request<Commands>('GET', {
            route: '/api/commands',
        }).then((res) => res);

        cmds = response.body;

        return res.status(200).json(cmds);
    }),
);

export default commands;
