import environment from '@auth/environment';

export default function createInviteLink(guild_id: string | null) {
    const guild =
        typeof guild_id === 'string'
            ? `&guild_id=${guild_id}&disable_guild_select=true`
            : '';
    return `https://discord.com/oauth2/authorize?client_id=${environment.client_id}&permissions=${environment.permissions}&scope=bot${guild}`;
}
