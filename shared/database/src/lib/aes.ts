import crypto from 'crypto';

const key = process.env.CLIENT_SECRET ?? 'some key';

export function encrypt(val: string) {
    const cipher = crypto.createCipheriv('aes-256-cbc', key + key, key);
    let encrypted = cipher.update(val, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
}

export function decrypt(encrypted: string) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key + key, key);
    const decrypted = decipher.update(encrypted, 'base64', 'utf8');
    return decrypted + decipher.final('utf8');
}
