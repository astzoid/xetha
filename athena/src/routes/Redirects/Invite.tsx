import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Invite() {
    const location = useLocation();
    let guild_id: string | null;
    try {
        guild_id = new URLSearchParams(location.search).get('guild_id');
    } catch (err) {
        guild_id = null;
    }
    window.location.href = `/api/invite${
        guild_id ? `?guild_id=${guild_id}` : ''
    }`;
    return <></>;
}
