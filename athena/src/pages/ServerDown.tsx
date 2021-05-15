import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Canvas from '@components/Canvas';
import Content from '@components/Content';
import Meta from '@components/Meta';

import useQueryParams from '@hooks/useQueryParams';

import { Container, Typography } from '@material-ui/core';

export default function ServerDown() {
    const query = useQueryParams();
    const history = useHistory();
    const [retries, setRetries] = useState(0);
    const [count, setCount] = useState(5);

    useEffect(() => {
        let retries = 1;
        if (
            query.has('retries') &&
            !Number.isNaN(Number(query.get('retries')))
        ) {
            retries = Number(query.get('retries'));
        }
        setCount(5 * retries);
        setRetries(retries);
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (retries > 0)
            interval = setInterval(() => setCount(count - 1), 1000);

        return () => clearInterval(interval);
    }, [retries]);

    useEffect(() => {
        if (count <= 0) {
            history.replace({ search: `?retries=${retries}` });
            window.location.reload();
        }
    }, [count]);

    if (retries === 0) return null;

    return (
        <Content nofooter>
            <Meta
                title="Server Down"
                description="Server is temporarily down."
                noindex
                nofollow
                revisitAfter="1d"
            />
            <Canvas particles={['5', '0']} />
            <Container>
                <Typography variant="h2" component="h1" color="textPrimary">
                    Server Down
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Oh oh, seems that the server is temporarily down, or you
                    lost connection?
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Retrying in {count} seconds.
                </Typography>
            </Container>
        </Content>
    );
}
