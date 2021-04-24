import React, { useState, useEffect } from 'react';
import RequestHandler from '../../rest/RequestHandler';
import { Provider } from '../auth';
import Logger from '../functions/Logger';

import type { ReactNode } from 'react';
import type User from '../typings/User';

export default function Authentication(props: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    RequestHandler.request<User>('GET', { route: '/api/user' })
      .then((response) => {
        setUser(response.body);
        Logger.info(response);
      })
      .catch((err) => {
        Logger.error(err);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  return <Provider value={user}>{!loading && props.children}</Provider>;
}
