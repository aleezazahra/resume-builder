import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      
      callbackURL: process.env.NODE_ENV === "production"
        ? "https://https://resume-builder-1v7l.vercel.app/auth/google/callback"
        : "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0].value;
        if (!email) {
          return done(new Error("No email found in Google profile"), false);
        }

        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: email,
          });
        } else if (!user.googleId) {
          user.googleId = profile.id;
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error as Error, false);
      }
    }
  )
);