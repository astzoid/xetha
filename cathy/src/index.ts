import './App';
import { GuildInfo } from 'passport-discord';

declare global {
  namespace Express {
    interface User {
      user_id: string;
      username: string;
      discriminator: string;
      tag: string;
      avatar: string;
      guilds: GuildInfo[];
    }
  }
}
