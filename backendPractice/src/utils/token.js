import crypto from 'crypto';

export const generateResetToken = () => {
    const TOKEN_BYTES = 32;

    return crypto.randomBytes(TOKEN_BYTES).toString('hex');
}