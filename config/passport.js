const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = (passport) => {
    // Local Strategy
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
            try {
                const user = await User.findOne({ where: { email } });
                if (!user) {
                    return done(null, false, { message: 'User not found' });
                }
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return done(null, false, { message: 'Incorrect password' });
                }
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        })
    );

    // Google Strategy
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: '/auth/google/callback',
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    let user = await User.findOne({ where: { googleId: profile.id } });
                    if (!user) {
                        user = await User.create({
                            name: profile.displayName,
                            email: profile.emails[0].value,
                            googleId: profile.id,
                            role: 'guest',
                        });
                    }
                    return done(null, user);
                } catch (err) {
                    return done(err);
                }
            }
        )
    );

    // Facebook Strategy
    passport.use(
        new FacebookStrategy(
            {
                clientID: process.env.FACEBOOK_APP_ID,
                clientSecret: process.env.FACEBOOK_APP_SECRET,
                callbackURL: '/auth/facebook/callback',
                profileFields: ['id', 'displayName', 'emails'],
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    let user = await User.findOne({ where: { facebookId: profile.id } });
                    if (!user) {
                        user = await User.create({
                            name: profile.displayName,
                            email: profile.emails[0]?.value || null,
                            facebookId: profile.id,
                            role: 'guest',
                        });
                    }
                    return done(null, user);
                } catch (err) {
                    return done(err);
                }
            }
        )
    );

    // Serialize and Deserialize
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findByPk(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
};
