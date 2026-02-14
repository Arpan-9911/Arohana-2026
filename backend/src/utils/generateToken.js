import jwt from 'jsonwebtoken';

export function generateToken({ res, payload, secret, cookieName, expiresIn = "1d", }) {
    const token = jwt.sign(payload, secret, { expiresIn });
    res.cookie(cookieName, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
    })
}