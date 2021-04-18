interface _user {
  user_id: string;
  username: string;
  discriminator: string;
  avatar: string;
  tag: string;
  guilds: DiscordGuild[];
}

export type User = _user | null;

export interface DiscordGuild {
  id: string;
  name: string;
  acro: string;
  icon: string;
  permissions: Permissions;
}
