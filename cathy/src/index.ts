import './App';

declare global {
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
