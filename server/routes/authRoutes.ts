import express from 'express';
import passport from 'passport';
import { googleCallback } from '../controllers/authContoller.js';

const router = express.Router();

const FRONTEND_URL = process.env.NODE_ENV === "production"
  ? "https://naqshresume.vercel.app"
  : "http://localhost:5173";

// User clicks this link on your frontend
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google sends the user here automatically
router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: `${FRONTEND_URL}/login`, session: false }),
    googleCallback
);

export default router;