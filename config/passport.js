import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as LocalStrategy } from 'passport-local'; // Thêm LocalStrategy cho đăng nhập thông thường
import bcrypt from 'bcryptjs';
import User from '../models/User.js'; // Mô hình User của bạn

// Cấu hình Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: 'YOUR_GOOGLE_CLIENT_ID', // Thay thế bằng Client ID của bạn
      clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET', // Thay thế bằng Client Secret của bạn
      callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ where: { googleId: profile.id } });

        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
        });

        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Cấu hình Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: 'YOUR_FACEBOOK_APP_ID',
      clientSecret: 'YOUR_FACEBOOK_APP_SECRET',
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
      profileFields: ['id', 'emails', 'name'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ where: { facebookId: profile.id } });

        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = await User.create({
          facebookId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
        });

        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Cấu hình Local Strategy cho đăng nhập
passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }

        // So sánh mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Lưu thông tin người dùng vào phiên làm việc
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Lấy thông tin người dùng từ phiên làm việc
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
