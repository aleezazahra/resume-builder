import express from 'express';
import passport from 'passport';
import { googleCallback } from '../controllers/authContoller.js';

const router = express.Router();

// User clicks this link on your frontend
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google sends the user here automatically
router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    googleCallback
);

export default router;