export default interface User {
    user_id: string;
    username: string;
    discriminator: string;
    avatar: string;
    accessToken: string;
    refreshToken: string;
}
