import Logger from '../../utils/Logger';
import { getGuild, getMember } from '../../client';
import { Guild } from '@shared/database';
import type { UserAttributes } from '@shared/database';
import type DoneCallback from '../../utils/DoneCallback';
import Serialize from '../../functions/Serialize';

export default function guild(
    user: UserAttributes,
    guild_id: string,
    done: DoneCallback,
) {
    if (typeof guild_id === 'string') {
        Promise.all([getGuild(guild_id), getMember(guild_id, user.user_id)])
            .then(async ([guild, member]) => {
                if (!guild || !member || !member?.dashboard)
                    return done(null, null);

                let guildSettings = await Guild.findOne({ guild_id });
                if (!guildSettings)
                    guildSettings = await Guild.create({
                        guild_id,
                        name: guild.name,
                    });

                return done(null, {
                    guild,
                    settings: Serialize(guildSettings.toJSON(), [
                        'guild_id',
                        'name',
                    ]),
                });
            })
            .catch((err) => {
                Logger.error(`[ws] Error`, err);
                done(new Error(`Internal WebSocket Error`));
            });
    } else {
        done(new Error(`'guild_id' should be a string`));
    }
}
