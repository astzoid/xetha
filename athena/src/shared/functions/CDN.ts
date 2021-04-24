const startsWith = (a: string, b: string) =>
  String.prototype.startsWith.call(a, b);

const root = 'https://cdn.discordapp.com';

export const avatar = (
  user_id: string,
  discriminator: string,
  avatar?: string,
) =>
  avatar
    ? `${root}/avatars/${user_id}/${avatar}${
        startsWith(avatar, 'a_') ? '.gif' : '.webp'
      }`
    : `${root}/embed/avatars/${discriminator}.png`;

export const Icon = (guild_id: string, icon: string | null) =>
  icon
    ? `${root}/icons/${guild_id}/${icon}${
        startsWith(icon, 'a_') ? '.gif' : '.webp'
      }`
    : null;
