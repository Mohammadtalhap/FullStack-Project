import crypto from 'crypto';

export const generateTemporaryPassword = () => {

    const PASSWORD_BYTES = 4;

    return crypto.randomBytes(PASSWORD_BYTES).toString('hex');
};