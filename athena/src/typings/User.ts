type User = null | {
    user_id: string;
    username: string;
    discriminator: string;
    avatar: string;
    accessToken: string;
    refreshToken: string;
};

export default User;
