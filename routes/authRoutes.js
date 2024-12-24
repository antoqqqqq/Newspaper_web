const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => res.redirect('/dashboard')
);

// Facebook login
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get(
    '/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    (req, res) => res.redirect('/dashboard')
);

module.exports = router;