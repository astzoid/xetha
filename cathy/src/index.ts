import './App';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface User {
            accessToken: string;
            refreshToken: string;
            user_id: string;
            username: string;
            discriminator: string;
            avatar: string;
        }
    }
}
