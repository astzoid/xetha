import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';

import { Provider } from '../auth';
import rest from '../auth/rest';
import Logger from '../functions/Logger';

import type User from '../typings/User';

export default function Authentication(props: { children: ReactNode }) {
    const [user, setUser] = useState<User>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        rest.get<User>({ route: '/api/user' })
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
