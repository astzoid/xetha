import crypto from 'crypto';

const secret = process.env.JWT_SECRET ?? 'Were in development';
const key = crypto
    .createHash('sha256')
    .update(String(secret))
    .digest('base64')
    .substr(0, 32);

export function encrypt(val: string) {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, key.slice(0, 16));
    let encrypted = cipher.update(val, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted.toString();
}

export function decrypt(encrypted: string) {
    const decipher = crypto.createDecipheriv(
        'aes-256-cbc',
        key,
        key.slice(0, 16),
    );
    const decrypted = decipher.update(encrypted, 'base64', 'utf8');
    return decrypted + decipher.final('utf8');
}
