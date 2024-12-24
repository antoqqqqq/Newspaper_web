const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const users = []; cần thay bằng database

module.exports = (passport) => {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
            const user = users.find((user) => user.email === email);
            if (!user) {
                return done(null, false, { message: 'No user with that email' });
            }

            try {
                if (await bcrypt.compare(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Password incorrect' });
                }
            } catch (err) {
                return done(err);
            }
        })
    );

    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        const user = users.find((user) => user.id === id);
        done(null, user);
    });
};
