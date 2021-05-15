import React from 'react';
import createInviteLink from '@functions/createInviteLink';
import useQueryParams from '@hooks/useQueryParams';

export default function Invite() {
    const query = useQueryParams();
    window.location.href = createInviteLink(query.get('guild_id'));
    return <></>;
}
