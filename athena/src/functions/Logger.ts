function parseOptions(type: string, message: any[]) {
    if (type === 'warn' || type === 'error')
        return [`[${type.toUpperCase()}]`, ...message];
    const color =
        typeof message[0] === 'string' &&
        message[0].startsWith('color:') &&
        message[0].length > 6
            ? message.shift().split(':')[1]
            : 'aqua';
    return [`%c[${type}]`, `color:${color}`, ...message.map((m) => m)];
}

function Log(type: string, message: any[]) {
    switch (type) {
        case 'warn':
        case 'error':
            console[type](...parseOptions(type, message));
            break;
        default:
            console.log(...parseOptions(type, message));
            break;
    }
}

const Logger = {
    info: (...message: any[]) => Log('INFO', message),
    warn: (...message: any[]) => Log('warn', message),
    error: (...message: any[]) => Log('error', message),
    log: (type: string, ...message: any[]) => Log(type, message),
};

export default Logger;

Logger.log('Logger.ts', 'Logger has been loaded.');
