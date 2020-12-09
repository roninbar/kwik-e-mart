const _ = require('lodash');
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const User = require('../models/User');

passport.use(new LocalStrategy(async function (username, password, done) {
    try {
        const user = await User.findOne({ username }, '+passwordHash');
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    }
    catch (error) {
        return done(error);
    }
}));

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
    try {
        done(null, await User.findById(id));
    } catch (err) {
        done(err);
    }
});

module.exports = passport;

