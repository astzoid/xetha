import { BlacklistedServer, BlacklistedUser } from '@shared/database';

export function getBlacklistedServer(target_id: string) {
    return BlacklistedServer.findOne({ target_id });
}

export function getBlacklistedUser(target_id: string) {
    return BlacklistedUser.findOne({ target_id });
}
