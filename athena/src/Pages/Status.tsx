import React, { useState, useEffect, lazy } from 'react';
import Content from '../Components/Content';
import Meta from '../Components/Meta';
import Loader from '../Components/Loader';
import RequestHandler from '../Api/RequestHandler';

const ServerError = lazy(() => import('./Errors/ServerError'));

interface Stats {
  guilds: number;
  shards: Shard[];
}

interface Shard {
  id: number;
  guilds: number;
  ping: number;
}

function Shard(props: Shard) {
  return <></>;
}

export default function Status() {
  const [status, setStatus] = useState<number>(0);
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    RequestHandler.request<Stats>('GET', { route: '/api/status ' })
      .then((response) => setStats(response.body))
      .then(() => setStatus(200))
      .catch((err) => {
        console.error(err);
        setStatus(500);
      });
  }, []);

  return (
    <Content>
      <Meta
        title="Service Status"
        description="Monitor the Service Status of Xetha"
        url="/status"
        keywords={['service', 'status']}
      />
      {status === 200 ? <></> : status === 0 ? <Loader /> : <ServerError />}
    </Content>
  );
}
