import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Invite() {
  const location = useLocation();
  const guild_id = new URLSearchParams(location.search).get('guild_id');
  window.location.href = `/api/invite${
    guild_id ? `?guild_id=${guild_id}` : ''
  }`;
  return <></>;
}
