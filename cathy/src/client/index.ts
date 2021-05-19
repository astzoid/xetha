import socket from './ws';
import type {
    Command,
    DiscordGuild,
    DiscordGuildMember,
    DiscordUser,
    Shard,
} from '@shared/types';

export function getCommands() {
    return new Promise<Command[]>((resolve, reject) => {
        const timeout = setTimeout(() => {
            destroy();
            reject(new Error(`Timeout: getCommands(): exceeded 10000 (msec)`));
        }, 10000);

        const destroy = () => {
            clearTimeout(timeout);
            socket.removeListener('disconnect', disconnection);
        };

        const disconnection = () => {
            destroy();
            reject(new Error('WS: getCommands(): disconnected'));
        };

        socket.once('disconnect', disconnection);

        socket.emit('commands', (err: Error | null, commands: Command[]) => {
            if (err) return reject(err);
            return resolve(commands);
        });
    });
}

export function getGuild(guild_id: string) {
    return new Promise<DiscordGuild>((resolve, reject) => {
        const timeout = setTimeout(() => {
            destroy();
            reject(new Error(`Timeout: getGuild(...): exceeded 10000 (msec)`));
        }, 10000);

        const destroy = () => {
            clearTimeout(timeout);
            socket.removeListener('disconnect', disconnection);
        };

        const disconnection = () => {
            destroy();
            reject(new Error('WS: getGuild(...): disconnected'));
        };

        socket.once('disconnect', disconnection);

        socket.emit(
            'guild',
            guild_id,
            (err: Error | null, guild: DiscordGuild) => {
                if (err) return reject(err);
                return resolve(guild);
            },
        );
    });
}

export function updateGuild(guild_id: string) {
    return new Promise<boolean>((resolve, reject) => {
        const timeout = setTimeout(() => {
            destroy();
            reject(new Error(`Timeout: getGuild(...): exceeded 10000 (msec)`));
        }, 10000);

        const destroy = () => {
            clearTimeout(timeout);
            socket.removeListener('disconnect', disconnection);
        };

        const disconnection = () => {
            destroy();
            reject(new Error('WS: getGuild(...): disconnected'));
        };

        socket.once('disconnect', disconnection);

        socket.emit(
            'guildUpdate',
            guild_id,
            (err: Error | null, updated: boolean) => {
                if (err) return reject(err);
                return resolve(updated);
            },
        );
    });
}

export function getMember(guild_id: string, member_id: string) {
    return new Promise<DiscordGuildMember>((resolve, reject) => {
        const timeout = setTimeout(() => {
            destroy();
            reject(new Error(`Timeout: getMember(...): exceeded 10000 (msec)`));
        }, 10000);

        const destroy = () => {
            clearTimeout(timeout);
            socket.removeListener('disconnect', disconnection);
        };

        const disconnection = () => {
            destroy();
            reject(new Error('WS: getMember(...): disconnected'));
        };

        socket.once('disconnect', disconnection);

        socket.emit(
            'member',
            guild_id,
            member_id,
            (err: Error | null, member: DiscordGuildMember) => {
                if (err) return reject(err);
                return resolve(member);
            },
        );
    });
}

export function getStatus() {
    return new Promise<Shard[]>((resolve, reject) => {
        const timeout = setTimeout(() => {
            destroy();
            reject(new Error(`Timeout: getStatus(): exceeded 10000 (msec)`));
        }, 10000);

        const destroy = () => {
            clearTimeout(timeout);
            socket.removeListener('disconnect', disconnection);
        };

        const disconnection = () => {
            destroy();
            reject(new Error('WS: getStatus(): disconnected'));
        };

        socket.once('disconnect', disconnection);

        socket.emit('status', (err: Error | null, shards: Shard[]) => {
            if (err) return reject(err);
            return resolve(shards);
        });
    });
}

export function getUser(user_id: string) {
    return new Promise<DiscordUser>((resolve, reject) => {
        const timeout = setTimeout(() => {
            destroy();
            reject(new Error(`Timeout: getUser(...): exceeded 10000 (msec)`));
        }, 10000);

        const destroy = () => {
            clearTimeout(timeout);
            socket.removeListener('disconnect', disconnection);
        };

        const disconnection = () => {
            destroy();
            reject(new Error('WS: getUser(...): disconnected'));
        };

        socket.once('disconnect', disconnection);

        socket.emit('user', user_id, (err: Error | null, user: DiscordUser) => {
            if (err) return reject(err);
            return resolve(user);
        });
    });
}
