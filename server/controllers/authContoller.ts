export const googleCallback = async (req: Request, res: Response) => {
    const user = req.user as any;
    if (!user) return res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);

    const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: '7d' }
    );

    // Send the token in the URL and let your current frontend logic (or a simple redirect) handle it
    res.redirect(`${process.env.FRONTEND_URL}/login-success?token=${token}`);
};