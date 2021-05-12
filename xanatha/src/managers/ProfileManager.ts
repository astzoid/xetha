import Manager from '../structures/Manager';
import { Profile } from '@shared/database';
import type { Disclosure } from 'disclosure-discord';

export default class ProfileManager extends Manager<any> {
    public constructor(client: Disclosure) {
        super(client);
    }

    public async fetch(user_id: string, tag: string) {
        let profile = await Profile.findOne({ user_id });

        if (!profile) profile = new Profile({ user_id, tag });
        if (profile.tag !== tag) profile.tag = tag;

        return profile;
    }

    public delete(user_id: string) {
        return Profile.deleteMany({ user_id });
    }
}
