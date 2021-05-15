import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useQueryParams from '@hooks/useQueryParams';
import useTokenStore from '@hooks/useTokenStore';

export default function useSaveTokens() {
    const query = useQueryParams();
    const history = useHistory();

    useEffect(() => {
        const accessToken = query.has('accessToken')
            ? query.get('accessToken')
            : false;
        const refreshToken = query.has('refreshToken')
            ? query.get('refreshToken')
            : false;

        if (
            typeof accessToken === 'string' &&
            typeof refreshToken === 'string' &&
            accessToken &&
            refreshToken
        ) {
            try {
                useTokenStore.getState().setTokens({
                    accessToken,
                    refreshToken,
                });
            } catch {}
            history.replace({ search: '' });
            window.location.reload();
        }
    }, []);
}
