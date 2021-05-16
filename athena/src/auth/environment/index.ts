import { createElement } from 'react';

const production = '_self' in createElement('div') ? false : true;

interface Environment {
    production: boolean;
    self: string;
    http: string;
    ws: string;
    client_id: string;
}

interface Extras {
    permissions: number;
}

const environment: Environment & Extras = {
    production,
    self: location.origin,
    http: production ? 'https://gateway.xetha-bot.me' : 'http://localhost:3001',
    ws: production ? 'wss://gateway.xetha-bot.me' : 'ws://localhost:3001',
    client_id: production ? '775680113949933569' : '000000000000000000',
    permissions: 1036381407,
};

export default environment;
