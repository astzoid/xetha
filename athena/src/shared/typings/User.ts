import type DiscordGuild from './DiscordGuild';

type User = null | {
  user_id: string;
  username: string;
  discriminator: string;
  avatar?: string;
  tag: string;
  guilds: DiscordGuild[];
};

export default User;
