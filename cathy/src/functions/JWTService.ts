import jwt from 'jsonwebtoken';
import { environment } from '@shared/env';

export function signAccessToken(user_id: string) {
    return jwt.sign(
        {
            user_id,
            type: 'access',
        },
        environment.JWT_SECRET,
        {
            expiresIn: '5m',
        },
    );
}

export function signRefreshToken(user_id: string) {
    return jwt.sign(
        {
            user_id,
            type: 'refresh',
        },
        environment.JWT_SECRET,
        {
            expiresIn: '1d',
        },
    );
}

interface Token {
    user_id: string;
    type: 'access' | 'refresh';
}

interface UserToken {
    user_id: string;
    tokens?: {
        accessToken: string;
        refreshToken: string;
    };
}

export function validateTokens(
    accessToken: string,
    refreshToken: string,
): Promise<UserToken | false> {
    return new Promise((resolve) => {
        let access: Token | null = null;
        let refresh: Token | null = null;

        try {
            refresh = jwt.verify(refreshToken, environment.JWT_SECRET) as Token;
            access = jwt.verify(accessToken, environment.JWT_SECRET) as Token;

            if (
                access?.type === 'access' &&
                refresh?.type === 'refresh' &&
                access?.user_id === refresh?.user_id
            )
                return resolve({ user_id: access.user_id });

            resolve(false);
        } catch (err) {
            if (refresh && err.name === 'TokenExpiredError')
                return resolve({
                    user_id: refresh.user_id,
                    tokens: {
                        accessToken: signAccessToken(refresh.user_id),
                        refreshToken,
                    },
                });

            resolve(false);
        }
    });
}
