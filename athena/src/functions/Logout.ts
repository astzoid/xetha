import useTokenStore from '@hooks/useTokenStore';

export default function Logout() {
    try {
        useTokenStore
            .getState()
            .setTokens({ accessToken: '', refreshToken: '' });
        window.location.reload();
    } catch (_err) {}
}
