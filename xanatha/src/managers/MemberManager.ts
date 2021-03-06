import Manager from '../structures/Manager';
import { Member } from '@shared/database';
import type { Disclosure } from 'disclosure-discord';

export default class MemberManager extends Manager<any> {
    public constructor(client: Disclosure) {
        super(client);
    }

    public async fetch(guild_id: string, member_id: string, tag: string) {
        let member = await Member.findOne({ guild_id, member_id });

        if (!member) member = new Member({ guild_id, member_id, tag });
        if (member.tag !== tag) member.tag = tag;

        return member;
    }

    public delete(guild_id: string, member_id: string) {
        return Member.deleteMany({ guild_id, member_id });
    }

    public deleteAll(guild_id: string) {
        return Member.deleteMany({ guild_id });
    }
}
