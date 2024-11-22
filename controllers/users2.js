const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const AppleStrategy = require('passport-apple').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const bcrypt = require('bcryptjs');
const { models } = require("../database/connection");
const { users , userEmails , userPhones , userUsernames , userGoogle , UserFacebook ,UserApple  , UserTwitter} = models;

// Local Strategy for email & password authentication
passport.use('local-email', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const userEmail = await UserEmail.findOne({ where: { email } });
    if (!userEmail) return done(null, false, { message: 'Invalid email or password.' });

    const isMatch = await bcrypt.compare(password, userEmail.password);
    if (!isMatch) return done(null, false, { message: 'Invalid email or password.' });

    const user = await User.findByPk(userEmail.userId);
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

// Local Strategy for username & password authentication
passport.use('local-username', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, async (username, password, done) => {
  try {
    const userUsername = await UserUsername.findOne({ where: { username } });
    if (!userUsername) return done(null, false, { message: 'Invalid username or password.' });

    const isMatch = await bcrypt.compare(password, userUsername.password);
    if (!isMatch) return done(null, false, { message: 'Invalid username or password.' });

    const user = await User.findByPk(userUsername.userId);
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

// Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, async (token, tokenSecret, profile, done) => {
  try {
    let userGoogle = await UserGoogle.findOne({ where: { googleId: profile.id } });

    if (userGoogle) {
      const user = await User.findByPk(userGoogle.userId);
      return done(null, user);
    } else {
      const user = await User.create({});
      userGoogle = await UserGoogle.create({
        userId: user.id,
        googleId: profile.id,
        email: profile.emails[0].value
      });
      return done(null, user);
    }
  } catch (err) {
    return done(err);
  }
}));

// Facebook Strategy
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['id', 'emails', 'name']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let userFacebook = await UserFacebook.findOne({ where: { facebookId: profile.id } });

    if (userFacebook) {
      const user = await User.findByPk(userFacebook.userId);
      return done(null, user);
    } else {
      const user = await User.create({});
      userFacebook = await UserFacebook.create({
        userId: user.id,
        facebookId: profile.id,
        email: profile.emails[0].value
      });
      return done(null, user);
    }
  } catch (err) {
    return done(err);
  }
}));

// Apple Strategy
passport.use(new AppleStrategy({
  clientID: process.env.APPLE_CLIENT_ID,
  teamID: process.env.APPLE_TEAM_ID,
  keyID: process.env.APPLE_KEY_ID,
  privateKey: process.env.APPLE_PRIVATE_KEY,
  callbackURL: '/auth/apple/callback',
}, async (accessToken, refreshToken, idToken, profile, done) => {
  try {
    let userApple = await UserApple.findOne({ where: { appleId: profile.id } });

    if (userApple) {
      const user = await User.findByPk(userApple.userId);
      return done(null, user);
    } else {
      const user = await User.create({});
      userApple = await UserApple.create({
        userId: user.id,
        appleId: profile.id
      });
      return done(null, user);
    }
  } catch (err) {
    return done(err);
  }
}));

// Twitter Strategy
passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: '/auth/twitter/callback'
}, async (token, tokenSecret, profile, done) => {
  try {
    let userTwitter = await UserTwitter.findOne({ where: { twitterId: profile.id } });

    if (userTwitter) {
      const user = await User.findByPk(userTwitter.userId);
      return done(null, user);
    } else {
      const user = await User.create({});
      userTwitter = await UserTwitter.create({
        userId: user.id,
        twitterId: profile.id
      });
      return done(null, user);
    }
  } catch (err) {
    return done(err);
  }
}));

// Serialize user instance to the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user instance from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
