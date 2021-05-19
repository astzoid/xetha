import type mongoose from '@shared/database';
import type { GuildAttributes } from '@shared/database';

export default function Validation(
    guild: GuildAttributes,
    data: mongoose.UpdateQuery<GuildAttributes>,
): mongoose.UpdateQuery<GuildAttributes> {
    // TODO
    guild;
    return data;
}
