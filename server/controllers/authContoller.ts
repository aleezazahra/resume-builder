// controllers/authController.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const googleCallback = async (req: Request, res: Response) => {
    const user = req.user as any;

    if (!user) {
        return res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
    }

    const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: '7d' }
    );

    res.redirect(`${process.env.FRONTEND_URL}/login-success?token=${token}`);
};
// controllers/authController.ts
res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
});
res.redirect(`${process.env.FRONTEND_URL}/dashboard`);