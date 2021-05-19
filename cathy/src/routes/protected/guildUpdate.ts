import type mongoose from '@shared/database';
import Logger from '../../utils/Logger';
import { getGuild, getMember, updateGuild } from '../../client';
import { Guild } from '@shared/database';
import type { GuildAttributes, UserAttributes } from '@shared/database';
import type DoneCallback from '../../utils/DoneCallback';
import Validation from '../../functions/Validatation';

export default function guildUpdate(
    user: UserAttributes,
    guild_id: string,
    data: mongoose.UpdateQuery<GuildAttributes>,
    done: DoneCallback,
) {
    if (typeof guild_id === 'string') {
        Promise.all([getGuild(guild_id), getMember(guild_id, user.user_id)])
            .then(async ([guild, member]) => {
                if (!guild || !member || !member?.dashboard)
                    return done(null, false);

                let newData: mongoose.UpdateQuery<GuildAttributes> | null =
                    null;

                try {
                    let guildSettings = await Guild.findOne({
                        guild_id,
                    });
                    if (!guildSettings)
                        guildSettings = await Guild.create({
                            guild_id,
                            name: guild.name,
                        });

                    newData = Validation(guildSettings, data);
                } catch (err) {
                    return done(new Error(err.messasge));
                }

                return Guild.updateOne({ guild_id }, newData)
                    .then(() => updateGuild(guild_id))
                    .then((status) => done(null, status));
            })
            .catch((err) => {
                Logger.error(`[ws] Error`, err);
                done(new Error(`Internal WebSocket Error`));
            });
    } else {
        done(new Error(`'guild_id' should be a string`));
    }
}
