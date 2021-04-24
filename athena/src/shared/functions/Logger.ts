type LogType = 'info' | 'warn' | 'error';

function Log(type: LogType, message: any) {
  console[type](`[${type}]`, message);
}

const Logger = {
  info: (message: any) => Log('info', message),
  warn: (message: any) => Log('warn', message),
  error: (message: any) => Log('error', message),
};

export default Logger;
