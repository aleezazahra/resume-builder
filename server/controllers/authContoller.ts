const FRONTEND_URL = process.env.NODE_ENV === "production"
  ? "https://naqshresume.vercel.app"
  : "http://localhost:5173";

export const googleCallback = async (req: Request, res: Response) => {
  try {
    const user = req.user as any;
    if (!user) return res.redirect(`${FRONTEND_URL}/login?error=auth_failed`);

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );

    res.redirect(`${FRONTEND_URL}/login-success?token=${token}`);
  } catch (err) {
    console.error('googleCallback error:', err);
    res.redirect(`${FRONTEND_URL}/login?error=server_error`);
  }
};