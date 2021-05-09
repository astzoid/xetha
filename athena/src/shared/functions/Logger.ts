type LogType = 'info' | 'warn' | 'error';

function Log(type: LogType, message: any) {
    console[type](`[${type}]`, message);
}

export default {
    info: (message: any) => Log('info', message),
    warn: (message: any) => Log('warn', message),
    error: (message: any) => Log('error', message),
};
